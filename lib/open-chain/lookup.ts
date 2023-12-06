// import { ethers } from "ethers";
import { DataItem, OpenChainResponse } from "./open-chain-response";
import { getParams } from "@/lib/sc-scan/get-params";
import { ABIInterface } from "@/lib/api/abi-interface";

const OPEN_CHAIN_API = "https://api.openchain.xyz/signature-database/v1";
export const lookUp = async (fn?: string, evt?: string): Promise<any> => {
  const response = await fetch(`${OPEN_CHAIN_API}/lookup?function=${fn}&event=${evt}&filter=true`);
  const data: OpenChainResponse = await response.json();

  const functions: ABIInterface[] = [];
  const events: ABIInterface[] = [];

  const processFunction = (key: string, info: DataItem, type: string) => {
    const inputs: string[] = getParams(info.name);
    const outputs: string[] = [];
    const name: string = info.name.split("(")[0];
    // const labelhash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(info.name));

    let abi: ABIInterface = {
      inputs: [],
      name: name,
      outputs: [],
      stateMutability: "",
      type: type,
      signature: key,
    };
    inputs.forEach((input: string, index: number) => {
      abi.inputs.push({ internalType: input, name: `param_${index}`, type: input });
    });
    outputs.forEach((output: string, index: number) => {
      abi.outputs.push({ internalType: output, name: `param_${index}`, type: output });
    });
    functions.push(abi);
  };

  const fns = data.result.function || {};
  for (const key in fns) {
    if (fns.hasOwnProperty(key) && fns[key]) {
      const info = fns[key][0];
      if (!info || info.name === "") {
        // functions.push({ signature: key, name: "", inputs: [], outputs: [] });
      } else {
        processFunction(key, info, "function");
      }
    }
  }

  const evts = data.result.event || {};
  for (const key in evts) {
    if (evts.hasOwnProperty(key) && evts[key]) {
      const info = evts[key][0];
      if (!info || info.name === "") {
        // events.push({ signature: key, name: "", inputs: [], outputs: [] });
      } else {
        processFunction(key, info, "event");
      }
    }
  }

  return { functions, events };
}
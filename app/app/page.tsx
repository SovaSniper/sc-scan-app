"use client";

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { DEFAULT_NETWORK, SelectNetworkBtn } from "@/components/main/select-network-btn";
import { getExplorer } from "@/lib/constant/explorers";
import { ABIResponse, ABIError } from "@/lib/api/abi-interface";
import { ABIDisplay } from "@/components/main/abi-display";
import { BACKEND_API, BACKEND_SUMMARY_API, isAddress } from "@/lib/utils";
import { ModeToggle } from "@/components/main/mode-toggle";
import { Box, Unplug, Copy } from "lucide-react";
import { LinkBtn } from "@/components/main/link-btn";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Info } from "@/components/main/info";
import { useRouter } from "next/navigation";
import { Contract } from "ethers";
import { ContractSummary } from "@/components/main/contract-summary";
import { Spinner } from "@/components/main/spinner";

export default function AppPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [selectedNetwork, setSelectedNetwork] = useState<string>(DEFAULT_NETWORK);
  const [contractAddress, setContractAddress] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abiLoading, setABILoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<ABIResponse | null>(null);
  const [triggerSummary, setTriggerSummary] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setABILoading(true);
    setErrorMessage("");
    setData(null);
    setTriggerSummary(false);
    try {
      console.log(`/api/contract?contract=${contractAddress}&network=${selectedNetwork}`)
      const response = await fetch(`/api/contract?contract=${contractAddress}&network=${selectedNetwork}`);
      if (!response.ok) {
        let data: ABIError = await response.json();
        console.log(data)
        const msg = data.detail || "Frontend error"
        setErrorMessage(msg);
        return;
      }

      const data: ABIResponse = await response.json();
      setData(data);
      setTriggerSummary(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setABILoading(false);
    }
  }

  return (
    <main className="max-h-screen">
      <div className="flex items-center justify-between space-x-4 px-8 py-3 border-b">
        <div className="font-bold cursor-pointer hover:text-primary" onClick={() => router.push('/')}>SC-Scan</div>
        <div className="space-x-2">
          <ModeToggle />
          <SelectNetworkBtn setParentValue={setSelectedNetwork} />
          <Button>Connect Wallet</Button>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 p-4">
          <div className="min-h-full rounded-2xl bg-grayscale-025">
            <div className="flex p-4 mb-2 space-x-2">
              <Input className="bg-grayscale-100" onChange={(e) => setContractAddress(e.target.value)} />
              <Button onClick={handleSearch} disabled={!isAddress(contractAddress) || isLoading}>
                {!isLoading
                  ? "Reverse!"
                  : "Loading..."
                }
              </Button>
            </div>

            <div className="p-4 overflow-y-scroll" style={{ maxHeight: "34em" }}>
              {abiLoading && <Spinner />}
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              {data &&
                <div>
                  {selectedTab === '0' &&
                    <ABIDisplay abi={data.abi.filter(x => x.type === "function")} verified={data.verified} predictState={true} />
                  }
                  {selectedTab === '1' &&
                    <ABIDisplay abi={data.abi.filter(x => x.type === "event")} />
                  }
                  {selectedTab === '2' &&
                    <ReactSyntaxHighlighter
                      className="!bg-transparent"
                      showLineNumbers={true}
                      language={"json"}
                      style={atomOneLight}>
                      {JSON.stringify(data.abi, null, 2)}
                    </ReactSyntaxHighlighter>}
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 p-4 my-4">
          <Tabs defaultValue="0" className="w-full"
            onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="0">Functions</TabsTrigger>
              <TabsTrigger value="1">Events</TabsTrigger>
              <TabsTrigger value="2">ABI</TabsTrigger>
            </TabsList>
          </Tabs>
          <ContractSummary trigger={triggerSummary} contract={contractAddress} network={selectedNetwork} setIsLoading={setIsLoading} />
          <div className="h-48 pl-4 py-2 rounded-2xl bg-grayscale-025 my-4">
            <div className="font-medium leading-none py-2">
              Info
            </div>
            {data &&
              <div className="h-36 py-2 pl-4 overflow-y-scroll overflow-x-scroll">
                <Info title="Verified OnChain" value={data.verified ? "Verified" : "Not Verified"} />
                <Info title="Verified with ChainLink" value={data.onChainCID ? data.onChainCID : "Not Verified"} />
                <Info title="Function" value={data.abi.filter(x => x.type === "function").length || 0} />
                <Info title="Event" value={data.abi.filter(x => x.type === "event").length || 0} />
              </div>
            }
          </div>
          <div className="flex py-2 px-4 rounded-2xl bg-grayscale-025 mt-4">
            <LinkBtn link={`${getExplorer(selectedNetwork)}/address/${contractAddress}`} icon={<Box />}
              content="View on Explorer" />
            <LinkBtn link={`${BACKEND_API}/api/abi?contract=${contractAddress}&network=${selectedNetwork}`} icon={<Unplug />}
              content="View on API" />
            <LinkBtn link={`${getExplorer(selectedNetwork)}/address/${contractAddress}`} icon={<Copy />}
              content="Copy Address" />
          </div>
        </div>
      </div>
    </main >
  );
}

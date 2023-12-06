export interface ABIInterface {
    inputs: ABIParam[]; // You can define a more specific type for inputs if needed
    name: string;
    outputs: ABIParam[];
    stateMutability: string;
    type: string;
    signature: string;
}

export interface ABIParam {
    internalType: string;
    name: string;
    type: string;
}

export interface ABIResponse {
    // summary: string;
    verified: boolean;
    abi: ABIInterface[];
    onChainCID?: string;
}

export interface ABIError {
    detail: string;
}
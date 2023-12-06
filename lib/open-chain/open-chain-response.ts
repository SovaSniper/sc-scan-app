export interface FunctionInfo {
    signature: string;
    name: string;
    inputs: string[];
    outputs: string[];
}

export interface DataItem {
    name: string;
    filtered: boolean;
}

export interface OpenChainResponse {
    ok: boolean;
    result: {
        event: { [key: string]: DataItem[] };
        function: { [key: string]: DataItem[] };
    };
}
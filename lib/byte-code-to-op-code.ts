export const byteCodeToOpCode = (bytecode: string): string[][] => {
    const opcodes: string[][] = [];
    let i = 0;

    while (i < bytecode.length) {
        const opcode = bytecode.slice(i, i + 2); // Extract the opcode bytes
        let params: string[] = [];

        switch (opcode) {
            case '00':
                opcodes.push(['STOP']);
                break;

            case '01':
                opcodes.push(['ADD']);
                break;

            case '02':
                opcodes.push(['MUL']);
                break;

            case '03':
                opcodes.push(['SUB']);
                break;

            case '04':
                opcodes.push(['DIV']);
                break;

            case '05':
                opcodes.push(['SDIV']);
                break;

            case '06':
                opcodes.push(['MOD']);
                break;

            case '07':
                opcodes.push(['SMOD']);
                break;

            case '08':
                opcodes.push(['ADDMOD']);
                break;

            case '09':
                opcodes.push(['MULMOD']);
                break;

            case '0a':
                opcodes.push(['EXP']);
                break;

            case '0b':
                opcodes.push(['SIGNEXTEND']);
                break;

            case '10':
                opcodes.push(['LT']);
                break;

            case '11':
                opcodes.push(['GT']);
                break;

            case '12':
                opcodes.push(['SLT']);
                break;

            case '13':
                opcodes.push(['SGT']);
                break;

            case '14':
                opcodes.push(['EQ']);
                break;

            case '15':
                opcodes.push(['ISZERO']);
                break;

            case '16':
                opcodes.push(['AND']);
                break;

            case '17':
                opcodes.push(['OR']);
                break;

            case '18':
                opcodes.push(['XOR']);
                break;

            case '19':
                opcodes.push(['NOT']);
                break;

            case '1a':
                opcodes.push(['BYTE']);
                break;

            case '1b':
                opcodes.push(['SHL']);
                break;

            case '1c':
                opcodes.push(['SHR']);
                break;

            case '1d':
                opcodes.push(['SAR']);
                break;

            case '20':
                opcodes.push(['SHA3']);
                break;

            case '30':
                opcodes.push(['ADDRESS']);
                break;

            case '31':
                opcodes.push(['BALANCE']);
                break;

            case '32':
                opcodes.push(['ORIGIN']);
                break;

            case '33':
                opcodes.push(['CALLER']);
                break;

            case '34':
                opcodes.push(['CALLVALUE']);
                break;

            case '35':
                opcodes.push(['CALLDATALOAD']);
                break;

            case '36':
                opcodes.push(['CALLDATASIZE']);
                break;

            case '37':
                opcodes.push(['CALLDATACOPY']);
                break;

            case '38':
                opcodes.push(['CODESIZE']);
                break;

            case '39':
                opcodes.push(['CODECOPY']);
                break;

            case '3a':
                opcodes.push(['GASPRICE']);
                break;

            case '3b':
                opcodes.push(['EXTCODESIZE']);
                break;

            case '3c':
                opcodes.push(['EXTCODECOPY']);
                break;

            case '3d':
                opcodes.push(['RETURNDATASIZE']);
                break;

            case '3e':
                opcodes.push(['RETURNDATACOPY']);
                break;

            case '3f':
                opcodes.push(['EXTCODEHASH']);
                break;

            case '40':
                opcodes.push(['BLOCKHASH']);
                break;

            case '41':
                opcodes.push(['COINBASE']);
                break;

            case '42':
                opcodes.push(['TIMESTAMP']);
                break;

            case '43':
                opcodes.push(['NUMBER']);
                break;

            case '44':
                opcodes.push(['DIFFICULTY']);
                break;

            case '45':
                opcodes.push(['GASLIMIT']);
                break;

            case '46':
                opcodes.push(['CHAINID']);
                break;

            case '47':
                opcodes.push(['SELFBALANCE']);
                break;

            case '50':
                opcodes.push(['POP']);
                break;

            case '51':
                opcodes.push(['MLOAD']);
                break;

            case '52':
                opcodes.push(['MSTORE']);
                break;

            case '53':
                opcodes.push(['MSTORE8']);
                break;

            case '54':
                opcodes.push(['SLOAD']);
                break;

            case '55':
                opcodes.push(['SSTORE']);
                break;

            case '56':
                opcodes.push(['JUMP']);
                break;

            case '57':
                opcodes.push(['JUMPI']);
                break;

            case '58':
                opcodes.push(['PC']);
                break;

            case '59':
                opcodes.push(['MSIZE']);
                break;

            case '5a':
                opcodes.push(['GAS']);
                break;

            case '5b':
                opcodes.push(['JUMPDEST']);
                break;

            case '5f':
                opcodes.push(['PUSH0']);
                break;

            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '68':
            case '69':
            case '6a':
            case '6b':
            case '6c':
            case '6d':
            case '6e':
            case '6f':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '76':
            case '77':
            case '78':
            case '79':
            case '7a':
            case '7b':
            case '7c':
            case '7d':
            case '7e':
            case '7f':
                const pushValueLength = parseInt(opcode, 16) - parseInt('5f', 16);
                const pushValue = bytecode.slice(i + 2, i + 2 + pushValueLength * 2);
                params.push(`0x${pushValue}`);
                opcodes.push([`PUSH${pushValueLength}`, ...params]);
                i += (pushValueLength * 2);
                break;

            case '80':
            case '81':
            case '82':
            case '83':
            case '84':
            case '85':
            case '86':
            case '87':
            case '88':
            case '89':
            case '8a':
            case '8b':
            case '8c':
            case '8d':
            case '8e':
            case '8f':
                const dupIndex = parseInt(opcode, 16) - parseInt('7f', 16);
                opcodes.push([`DUP${dupIndex}`]);
                break;

            case '90':
            case '91':
            case '92':
            case '93':
            case '94':
            case '95':
            case '96':
            case '97':
            case '98':
            case '99':
            case '9a':
            case '9b':
            case '9c':
            case '9d':
            case '9e':
            case '9f':
                const swapIndex = parseInt(opcode, 16) - parseInt('8f', 16);
                opcodes.push(['SWAP', `${swapIndex}`]);
                break;

            case 'a0':
            case 'a1':
            case 'a2':
            case 'a3':
            case 'a4':
                const logIndex = parseInt(opcode, 16) - parseInt('9f', 16);
                opcodes.push(['LOG', `${logIndex}`]);
                break;

            case 'f0':
                opcodes.push(['CREATE']);
                break;

            case 'f1':
                opcodes.push(['CALL']);
                break;

            case 'f2':
                opcodes.push(['CALLCODE']);
                break;

            case 'f3':
                opcodes.push(['RETURN']);
                break;

            case 'f4':
                opcodes.push(['DELEGATECALL']);
                break;

            case 'f5':
                opcodes.push(['CREATE2']);
                break;

            case 'fa':
                opcodes.push(['STATICCALL']);
                break;

            case 'fd':
                opcodes.push(['REVERT']);
                break;

            case 'fe':
                opcodes.push(['INVALID']);
                break;

            case 'ff':
                opcodes.push(['SUICIDE']);
                break;

            default:
                opcodes.push(['UNKNOWN']);
                break;
        }

        i += 2;
    }

    return opcodes;
}

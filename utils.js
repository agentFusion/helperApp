export function extractArgs() {
    let map = {};
    for (let index = 2; index < process.argv.length; index++) {
        const arg = process.argv[index].split('=');
        if (arg.length > 1) {
            map[arg[0].replace('--', '')] = arg[1];
        }
        else {
            map[arg[0].replace('--', '')] = true;
        }
    }
    return map;
}

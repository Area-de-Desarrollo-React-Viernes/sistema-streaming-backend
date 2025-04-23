import { formatInsert } from "./FormatSeeder";
import { franchiciesInsert } from "./FranchiciesSeeder";
import { generInsert } from "./GenersSeeder";

async function main() {
    await generInsert();
    await formatInsert();
    await franchiciesInsert();
}

main().catch((err) => console.error(err));
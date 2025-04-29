import { ContentInsert } from "./ContentSeeder";
import { formatInsert } from "./FormatSeeder";
import { franchiciesInsert } from "./FranchiciesSeeder";
import { generInsert } from "./GenersSeeder";
import { serviceInsert } from "./ServiceSeeder";
import { statusInsert } from "./StatusSeeder";

async function main() {
    await generInsert();
    await formatInsert();
    await serviceInsert();
    await statusInsert();
    await franchiciesInsert();
    await ContentInsert();
}

main().catch((err) => console.error(err));
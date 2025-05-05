import { Franchise } from "../entities/Franchise";
import { FranchiseId } from "../entities/ValueObjects/FranchiseId";

export interface FranchiseService {
    getFranchise(id: FranchiseId): Promise<Franchise>;
}
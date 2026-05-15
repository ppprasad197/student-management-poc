import { FineResponse, FineSummary } from "../models/fine.model";

export interface FineState {
    fines: FineResponse | null;
    summary: FineSummary | null;
    loading: boolean;
    error: string | null
}
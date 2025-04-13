import { MockDataService, DataService } from "../services";

export interface IDynSrevice {
    service:MockDataService | DataService,
}
export const isMockSharedService = DataService; //environment.production?MockDataService:DataService

export const configuration = {
    GET_CHAT_HISTORY_TITLES:`sessions`,
    GET_CHAT_HISTORY_DETAILS:`session`,
    GET_LLM_MODELS:`llms`
    }

export const jsonData ={
    GET_WORKFLOWS:``,
    GET_CHAT_HISTORY_DETAILS:``,
    GET_LLM_MODELS:``
    }

export const ROUTES={
    WORKFLOW : 'workflows',
    WORKFLOW_REVIEW:'task',
    ORCHESTRATOR:'orchestrator',
    ORCHESTRATOR_DETAILS:'details',
    ANALYTICS:'analytics',
    ASSIGNMENT_GROUP:'assignment-group',
    ASSIGNMENT_GROUP_DETAILS:'details',
    ASSIGNMENT_GROUP_ROSTER:'roster',
    ISGS:'isgs',
    AUTOMATION:'automation',
    AUTOMATION_LIST:'task',
    AUTOMATION_DETAILS:'generate-code',
    AUDIT:'audit'
}


export const STORAGE_KEY={
}

export const CUSTOM_EVENT_VALUES ={
}

export const PATTERNS = {
}

export const ROLE = {
    manager:"manager",
    executive:"executive"
}
export const CONSTANTS ={
    WORKFLOW_LANDING : 'workflow-landing',
    ORCHESTRATOR:'orchestrator'
}
export const WORKFLOW_STATUS = {
    DRAFT:'draft',
    IN_PROGRESS:'in progress',
    COMPLETED:'completed',
    FAILED:'failed',
    IN_REVIEW:'in review'
}

export const WORKFLOW_CREATION_STATUS = {
    WORKFLOW:'workflow',
    CREATE_MEDIA:'create_media',
    UPDATE_MEDIA:'update_media',
    SINGLE_STAGE:'single',
    MULTI_STAGE:'multi',
    VIDEO: 'video',
    DOCUMENT:'document',
    LOCAL:'local',
    ISGS:'isgs'
}

export const MODEL_TYPE = {
    INTERNAL:'internal',
    GEMINI:'gemini',
    GEMINI_1:'gemini-pro-vision',
    GEMINI_15:'gemini-1.5-pro-001',
    EXTERNAL_VERTEX_SDK:'external_vertex_sdk',
    EXTERNAL_GENAI_SDK :'external_genai_sdk'
}


export const MEDIA_STATUS = {
    IN_PROGRESS:'in-progress',
    COMPLETED:'processed',
    FAILED:'failed',
    NEW:'new',
    PENDING:'pending'
}

export const TASK_STATUS = {
    PENDING : 'pending',
    APPROVED : 'approved',
    REJECTED : 'rejected'
}

export const TICKET_STATUS = {
    NEW:'new',
    IN_PROGRESS:'in progress',
    COMPLETED:'completed',
    OPENED: 'opened',
    ONHOLD:  'on hold',
    CLOSED: 'closed',
    CANCELLED: 'cancelled',
    RESOLVED: 'resolved'
}
 
export const ASSINMENT_GRP_STATUS = {
    BUSY:'busy',
    AVAILIABLE:'availiable',
    AWAY:'away',
    OFFLINE:'offline',

}

export const MONTH_LIST = [
    { name: 'Jan', code: 1 },
    { name: 'Feb', code: 2 },
    { name: 'Mar', code: 3 },
    { name: 'Apr', code: 4 },
    { name: 'May', code: 5 },
    { name: 'Jun', code: 6 },
    { name: 'Jul', code: 7 },
    { name: 'Aug', code: 8 },
    { name: 'Sep', code: 9 },
    { name: 'Oct', code: 10 },
    { name: 'Nov', code: 11 },
    { name: 'Dec', code: 12 }];
 
    export const LOCAL_STORE_KEY = {
        PREV_PATH:'prevPath',
        X_TRACE_ID:'x-trace-id'
    }
export const CHAT_TYPE = {
    RADIO:'radio',
    CODE:'code',
    QUES:'ques',
    ANS:'ans',
    TEXT:'text'
}

export const AUTOMATION_TYPE = {
   FIRST_CODE_GENERATION:'first',
   FIRST_TEST_CASE_GENERATION:'first-test',
   UPDATE_CODE:'code',
   UPDATE_CODE_DEPENDENCIES:'main_script_dependency_code',
   UPDATE_TEST:'test_case',
   UPDATE_DEPENDENCIES:'dependency_code',
   CODE_FILE:'code_file',
   TEST_CASE_FILE:'unit_test_file' ,
   NAME:'name',
   REVIEWER: 'reviewer',
   STATUS:"status",
   VERSION_ID:'version_id',
   SAVE_BOT_TEST_CASE:'bot_test_case' ,
   VERSION_STATE:'version_state',
   IS_PREVALIDATED:'is_prevalidated'    
}

export const AUTOMATION_VIEWS = {
    CHAT:'chat',
    LOGS:'logs',
    DEPENDENCIES:'dep'
}

export const AUTOMATION_STATUS = {
    NEW:'new',
    DRAFT:'draft',
    INPROGRESS:'in progress',
    REVIEW:'review',
    COMPLETE : "complete"
}

export const CODE_VERSION_STATUS = {
    NEW: 'new',
    COMPLETE : 'complete',
    INPROGRESS : 'in progress',
    VALIDATED : 'validated'
}

export const AUTO_VERSION_STATE = {
    INITIAL: 'initial',
    CODE_GENERATED : 'code_generated',
    TEST_CASE_GENERATED : 'test_case_generated',
    TEST_CASE_VALIDATED : 'test_case_validated',
    VULNERABILITY_REPORT_GENERATED : 'vulnerability_report_generated',
    DEPLOYMENT_INTIATED:'code_deployment_initiated',
    DEPLOYMENT_FAILED: "code_deployment_failed",
    DEPLOYMENT_STATE_COMPLETED: "deployment_completed",
    DEPLOYMENT_COMPLETED : 'code_deployed',
    CODE_VALIDATED:'code_validated',
    PUBLISHED : 'published',
    FAILSAFE_DETAILS_ADDED : "failsafe_details_added",
    INPUT_CONFIGS_SAVED : "input_configs_saved"
    
}

export const ENV_VARIABLE={
    VM:'vm',
    GCLOUD:'gcloud'
}
export const SOCKET_KEYS={
    GLOBALSEARCH:'globalSearch',
    AUTOCHAT:'autoChat'
}

export const FILE_TYPE = {
    VIDEO:'video',
    APPLICATION:'application',
    IMAGE:'image'
}
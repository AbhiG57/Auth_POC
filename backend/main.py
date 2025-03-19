from fastapi import FastAPI, Request, HTTPException
 
app = FastAPI()
 
@app.get("/data")
def get_data(request: Request):
    tenant_id = request.headers.get('X-Tenant-ID')
    user_id = request.headers.get('X-User-ID')
    client_id = request.headers.get('X-Client-ID')
    print(tenant_id,user_id,client_id)
    return {"message": "Secure data from FastAPI"}
 
@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI backend!"}
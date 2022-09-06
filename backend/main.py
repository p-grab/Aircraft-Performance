from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import aircraft_performance
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Parameters(BaseModel):
    proptype: str
    mass: float
    area: float
    A: float
    B: float
    C: float
    g: float
    step: float

@app.post("/calculate/")
def calculate(object: Parameters):
    proptype_sent = object.proptype
    mass_sent = object.mass
    area_sent = object.area
    A_sent = object.A
    B_sent = object.B
    C_sent = object.C
    g_sent = object.g
    step_sent = object.step
    returned_dict = aircraft_performance.main(proptype_sent,mass_sent, area_sent, A_sent, B_sent, C_sent, g_sent, step_sent)
    df = pd.DataFrame()
    return [{
        'x': returned_dict['V_max_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'V_max'
        }, {
        'x': returned_dict['V_min_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'V_min'
        },
        {
        'x': returned_dict['V_w_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'V_w'
        },
        {
        'x': returned_dict['V_gamma_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'V_gamma'  
        },
        {
        'x': returned_dict['w_max_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'w_max'   
        },
        {
        'x': returned_dict['gamma_max_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'gamma_max' 
        },
        {
        'x': returned_dict['t_min_list'], 
        'y' : returned_dict['heights'],
        'type': 'line',
        'name': 'gamma_max' 
        }
        ]
    return {
                'V_max_list': returned_dict['V_max_list'],
                'V_min_list': returned_dict['V_min_list'],
                'V_w_list' : returned_dict['V_w_list'],
                'V_gamma_list' : returned_dict['V_gamma_list'],
                'gamma_max_list' : returned_dict['gamma_max_list'],
                'w_max_list' : returned_dict['w_max_list'],
                'heights' : returned_dict['heights'],
    }

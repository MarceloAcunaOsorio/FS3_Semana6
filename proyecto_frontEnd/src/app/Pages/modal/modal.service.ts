import { ComponentType } from "@angular/cdk/portal";
import { Injectable,inject } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { producto } from "../../models/producto";


@Injectable({providedIn:'root'})
export class ModalService{
    
    private readonly _dialog = inject(MatDialog);


    //metodo abrir modal
    openModal<CT,T = producto>(componentRef: ComponentType<CT>,data?:T,isEditing = false):void{
        const config = {data,isEditing};

        this._dialog.open(componentRef,{
            data: config,
            width : '600px'
        });
    }


    //metodo cerrar modal
    closeModal():void{
        this._dialog.closeAll();
    }
}
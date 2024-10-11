import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

  createParentIdToChildrenIds=<T extends any[]>(objParentIdToChildrenIds:Record<string, T>,childArr:T,field:string)=>{
    return ()=>{
      for (const parentId in objParentIdToChildrenIds) {
        for (
          let i = objParentIdToChildrenIds[parentId].length - 1;
          i >= 0;
          i--
        ) {
          if (
            !childArr.find(
              (c) =>
                c[field] ===
                objParentIdToChildrenIds[parentId][i]._id
            )
          ) {
            objParentIdToChildrenIds[parentId].splice(i, 1);
          }
        }
      }
  
      for (const child of childArr) {
        if (!child[field]) {
          continue;
        }
  
        objParentIdToChildrenIds[child[field]] =
          objParentIdToChildrenIds[child[field]] || [];
  
        if (
          !objParentIdToChildrenIds[child[field]].find(
            (c) => c._id === child._id
          )
        ) {
          objParentIdToChildrenIds[child[field]].push(child);
        }
      }
    }
  }
}
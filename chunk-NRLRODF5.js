import{Pa as n,Za as u,ab as l,bb as c,cb as d,db as m,jb as o,r as h,u as t}from"./chunk-D3PDAAZ7.js";var b=(()=>{class s extends m{get thumb(){return!this.user.thumb||this.user.thumb.includes("assets/default.png")?"assets/default.png":this.url+this.user.thumb}constructor(e,r,a,g,p){super({name:"user"}),this._http=e,this._store=r,this._alert=a,this._core=g,this._router=p,this.url=o.url,this.roles=(o.roles||[]).concat(["admin"]),this.employees=o.roles||[],this.mode="",this.users=this.getDocs(),this.user=localStorage.getItem("waw_user")?JSON.parse(localStorage.getItem("waw_user")):this.new(),this._changingPassword=!1,this.fetch({},{name:"me"}).subscribe(i=>{i?(!localStorage.getItem("waw_user")&&this._router.url==="/sign"&&this._router.navigateByUrl("/profile"),this.setUser(i),this.get()):localStorage.getItem("waw_user")&&this.logout()}),this._store.get("mode",i=>{i&&this.setMode(i)})}setMode(e=""){e?(this._store.set("mode",e),document.body.parentNode.classList.add(e)):(this._store.remove("mode"),document.body.parentNode.classList.remove("dark")),this.mode=e}setUser(e){this.user=e,localStorage.setItem("waw_user",JSON.stringify(e)),this._core.complete("us.user")}role(e){return!!(this.user?.is||{})[e]}updateMe(){this.setUser(this.user),this.update(this.user)}updateMeAfterWhile(){this.setUser(this.user),this.updateAfterWhile(this.user)}changePassword(e,r){this._changingPassword||(this._changingPassword=!0,this._http.post("/api/user/changePassword",{newPass:r,oldPass:e},a=>{this._changingPassword=!1,a?this._alert.info({text:"Successfully changed password"}):this._alert.error({text:"Incorrect current password"})}))}logout(){this.user=this.new(),localStorage.removeItem("waw_user"),this._http.remove("token"),this._http.get("/api/user/logout"),this._router.navigateByUrl("/sign"),setTimeout(()=>{location.reload()},100)}updateAdmin(e){this.update(e,{name:"admin"})}deleteAdmin(e){this.delete(e,{name:"admin"})}static{this.\u0275fac=function(r){return new(r||s)(t(c),t(l),t(d),t(u),t(n))}}static{this.\u0275prov=h({token:s,factory:s.\u0275fac,providedIn:"root"})}}return s})();export{b as a};

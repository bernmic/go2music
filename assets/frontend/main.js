"use strict";
(self["webpackChunkgo2music"] = self["webpackChunkgo2music"] || []).push([["main"],{

/***/ 8399:
/*!**********************************************!*\
  !*** ./src/app/age/age-decades.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgeDecadesComponent": () => (/* binding */ AgeDecadesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _age_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./age.service */ 542);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/expansion */ 5082);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 4021);






function AgeDecadesComponent_mat_expansion_panel_2_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AgeDecadesComponent_mat_expansion_panel_2_ng_template_3_a_1_Template_a_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const year_r4 = restoredCtx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r5.gotoSongs(year_r4.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const year_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", year_r4.name, " (", year_r4.count, " songs)");
} }
function AgeDecadesComponent_mat_expansion_panel_2_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AgeDecadesComponent_mat_expansion_panel_2_ng_template_3_a_1_Template, 2, 2, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const decade_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.decadeMap[decade_r1.name]);
} }
function AgeDecadesComponent_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-expansion-panel", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("opened", function AgeDecadesComponent_mat_expansion_panel_2_Template_mat_expansion_panel_opened_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const decade_r1 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r8.getYears(decade_r1.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-expansion-panel-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, AgeDecadesComponent_mat_expansion_panel_2_ng_template_3_Template, 2, 1, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const decade_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", decade_r1.name, " (", decade_r1.count, " songs)");
} }
class AgeDecadesComponent {
    constructor(router, ageService) {
        this.router = router;
        this.ageService = ageService;
        this.decadeMap = new Map();
    }
    ngOnInit() {
        this.ageService.getDecades().subscribe(decades => this.decades = decades);
    }
    getYears(decade) {
        this.ageService.getYears(decade).subscribe(years => this.decadeMap[decade] = years);
    }
    gotoSongs(year) {
        this.router.navigate(["/song/age/" + year]);
    }
}
AgeDecadesComponent.ɵfac = function AgeDecadesComponent_Factory(t) { return new (t || AgeDecadesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_age_service__WEBPACK_IMPORTED_MODULE_0__.AgeService)); };
AgeDecadesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AgeDecadesComponent, selectors: [["app-age-decades"]], decls: 3, vars: 1, consts: [[1, "decades"], [3, "opened", 4, "ngFor", "ngForOf"], [3, "opened"], ["matExpansionPanelContent", ""], ["mat-list-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click"]], template: function AgeDecadesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-accordion");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AgeDecadesComponent_mat_expansion_panel_2_Template, 4, 2, "mat-expansion-panel", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.decades);
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatAccordion, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanelContent, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListItem], styles: ["a[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZS1kZWNhZGVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUssZUFBQTtBQUVMIiwiZmlsZSI6ImFnZS1kZWNhZGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYSAgeyBjdXJzb3I6IHBvaW50ZXIgfVxuIl19 */"] });


/***/ }),

/***/ 9605:
/*!*******************************************!*\
  !*** ./src/app/age/age-routing.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgeRoutingModule": () => (/* binding */ AgeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _age_decades_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./age-decades.component */ 8399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const ageRoutes = [
    { path: 'age', component: _age_decades_component__WEBPACK_IMPORTED_MODULE_1__.AgeDecadesComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class AgeRoutingModule {
}
AgeRoutingModule.ɵfac = function AgeRoutingModule_Factory(t) { return new (t || AgeRoutingModule)(); };
AgeRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AgeRoutingModule });
AgeRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(ageRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AgeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 7841:
/*!***********************************!*\
  !*** ./src/app/age/age.module.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgeModule": () => (/* binding */ AgeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _age_decades_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./age-decades.component */ 8399);
/* harmony import */ var _age_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./age.service */ 542);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/expansion */ 5082);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ 1382);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);









class AgeModule {
}
AgeModule.ɵfac = function AgeModule_Factory(t) { return new (t || AgeModule)(); };
AgeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AgeModule });
AgeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [
        _age_service__WEBPACK_IMPORTED_MODULE_1__.AgeService
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__.MatExpansionModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AgeModule, { declarations: [_age_decades_component__WEBPACK_IMPORTED_MODULE_0__.AgeDecadesComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__.MatExpansionModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule], exports: [_age_decades_component__WEBPACK_IMPORTED_MODULE_0__.AgeDecadesComponent] }); })();


/***/ }),

/***/ 542:
/*!************************************!*\
  !*** ./src/app/age/age.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgeService": () => (/* binding */ AgeService)
/* harmony export */ });
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 3981);




class AgeService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
    constructor(http) {
        super();
        this.http = http;
    }
    getDecades() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.restserver + "/api/info/decades");
    }
    getYears(decade) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.restserver + "/api/info/decades/" + decade);
    }
}
AgeService.ɵfac = function AgeService_Factory(t) { return new (t || AgeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
AgeService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AgeService, factory: AgeService.ɵfac });


/***/ }),

/***/ 6166:
/*!************************************************!*\
  !*** ./src/app/album/album-cover.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumCoverComponent": () => (/* binding */ AlbumCoverComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);



class AlbumCoverComponent {
    constructor(albumService) {
        this.albumService = albumService;
        this.coverUrl = this.albumService.albumCoverUrl(this.album);
    }
    ngOnInit() {
        this.coverUrl = this.albumService.albumCoverUrl(this.album);
    }
}
AlbumCoverComponent.ɵfac = function AlbumCoverComponent_Factory(t) { return new (t || AlbumCoverComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_album_service__WEBPACK_IMPORTED_MODULE_0__.AlbumService)); };
AlbumCoverComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AlbumCoverComponent, selectors: [["album-cover"]], inputs: { album: "album" }, decls: 4, vars: 4, consts: [[3, "routerLink"], [1, "image", 3, "src", "alt"], [1, "album-info"]], template: function AlbumCoverComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/song/album/", ctx.album.albumId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("alt", ctx.album.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.coverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.album.title);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink], styles: [".image[_ngcontent-%COMP%] {position: relative; top: 0; left: 0; max-width: 100%; max-height: 100%; -o-object-fit: contain; object-fit: contain;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWNvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLHNCQUFtQixFQUFuQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJhbGJ1bS1jb3Zlci5jb21wb25lbnQudHMiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1hZ2Uge3Bvc2l0aW9uOiByZWxhdGl2ZTsgdG9wOiAwOyBsZWZ0OiAwOyBtYXgtd2lkdGg6IDEwMCU7IG1heC1oZWlnaHQ6IDEwMCU7IG9iamVjdC1maXQ6IGNvbnRhaW47fSJdfQ== */", ".album-info[_ngcontent-%COMP%] {position: absolute; background-color: rgba(255,255,255,0); color: rgba(0,0,0,0); width: 100%; left: 0px; bottom: 10px; z-index: 1000;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWNvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhLGtCQUFrQixFQUFFLHFDQUFxQyxFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyIsImZpbGUiOiJhbGJ1bS1jb3Zlci5jb21wb25lbnQudHMiLCJzb3VyY2VzQ29udGVudCI6WyIuYWxidW0taW5mbyB7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDApOyBjb2xvcjogcmdiYSgwLDAsMCwwKTsgd2lkdGg6IDEwMCU7IGxlZnQ6IDBweDsgYm90dG9tOiAxMHB4OyB6LWluZGV4OiAxMDAwO30iXX0= */", ".album-info[_ngcontent-%COMP%]:hover {background-color: rgba(255,255,255,0.7); color: rgba(0,0,0,1.0); }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWNvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQkFBbUIsdUNBQXVDLEVBQUUsc0JBQXNCLEVBQUUiLCJmaWxlIjoiYWxidW0tY292ZXIuY29tcG9uZW50LnRzIiwic291cmNlc0NvbnRlbnQiOlsiLmFsYnVtLWluZm86aG92ZXIge2JhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC43KTsgY29sb3I6IHJnYmEoMCwwLDAsMS4wKTsgfSJdfQ== */"] });


/***/ }),

/***/ 7113:
/*!****************************************************!*\
  !*** ./src/app/album/album-cover.new.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumCoverNewComponent": () => (/* binding */ AlbumCoverNewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ 4731);





class AlbumCoverNewComponent {
    constructor(albumService, router) {
        this.albumService = albumService;
        this.router = router;
    }
    ngOnInit() {
        this.albumService.getCover(this.album).subscribe((res) => { this.cover = res; }, error => {
            this.cover = "/assets/img/defaultAlbum.png";
        });
    }
    gotoAlbum() {
        //this.router.navigate(["/song/album/" + this.album.albumId]);
        this.router.navigate(["/album/" + this.album.albumId]);
    }
}
AlbumCoverNewComponent.ɵfac = function AlbumCoverNewComponent_Factory(t) { return new (t || AlbumCoverNewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_album_service__WEBPACK_IMPORTED_MODULE_0__.AlbumService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AlbumCoverNewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AlbumCoverNewComponent, selectors: [["app-album-cover-new"]], inputs: { album: "album" }, decls: 2, vars: 2, consts: [["mat-card-image", "", "width", "100%", 3, "src", "matTooltip", "click"]], template: function AlbumCoverNewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlbumCoverNewComponent_Template_img_click_1_listener() { return ctx.gotoAlbum(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("matTooltip", ctx.album.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.cover, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardImage, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__.MatTooltip], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhbGJ1bS1jb3Zlci1uZXcuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 4867:
/*!*************************************************!*\
  !*** ./src/app/album/album-detail.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumDetailComponent": () => (/* binding */ AlbumDetailComponent)
/* harmony export */ });
/* harmony import */ var _album_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./album.model */ 7455);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ 1933);








function AlbumDetailComponent_mat_chip_list_12_mat_chip_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tag_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](tag_r3.name);
} }
function AlbumDetailComponent_mat_chip_list_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-chip-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AlbumDetailComponent_mat_chip_list_12_mat_chip_1_Template, 2, 1, "mat-chip", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.albumInfo == null ? null : ctx_r0.albumInfo.tags.tag);
} }
function AlbumDetailComponent_a_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "last.fm");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx_r1.albumInfo == null ? null : ctx_r1.albumInfo.url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
class AlbumDetailComponent {
    constructor(router, route, albumService) {
        this.router = router;
        this.route = route;
        this.albumService = albumService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (params.get('id') === null) {
                return;
            }
            this.albumId = params.get("id");
            this.albumService.getAlbumInfo(params.get('id')).subscribe(a => {
                this.album = a;
                this.albumInfo = a.info;
                this.albumId = a.albumId;
            });
        });
    }
    cover(size) {
        let album = new _album_model__WEBPACK_IMPORTED_MODULE_0__.Album(this.albumId, "", "");
        return this.albumService.albumCoverUrl(album);
        if (this.albumInfo !== null && this.albumInfo !== undefined && this.albumInfo.image != null && this.albumInfo.image !== undefined) {
            for (let image of this.albumInfo.image) {
                if (image["size"] === size) {
                    return image["#text"];
                }
            }
        }
        return "";
    }
    artistClicked() {
        this.router.navigate(["/artist/" + this.album.artist.artistId]);
    }
}
AlbumDetailComponent.ɵfac = function AlbumDetailComponent_Factory(t) { return new (t || AlbumDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_album_service__WEBPACK_IMPORTED_MODULE_1__.AlbumService)); };
AlbumDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AlbumDetailComponent, selectors: [["app-album-detail"]], decls: 17, vars: 8, consts: [[1, "album-card"], [3, "click"], ["mat-card-image", "", 3, "src"], ["mat-button", "", "target", "_blank", 3, "href"], [4, "ngIf"], ["mat-button", "", 3, "routerLink"], ["mat-button", "", "target", "_blank", 3, "href", 4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function AlbumDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-card-subtitle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AlbumDetailComponent_Template_mat_card_subtitle_click_4_listener() { return ctx.artistClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Read more");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, AlbumDetailComponent_mat_chip_list_12_Template, 2, 1, "mat-chip-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Songs");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, AlbumDetailComponent_a_16_Template, 2, 1, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.albumInfo == null ? null : ctx.albumInfo.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.albumInfo == null ? null : ctx.albumInfo.artist);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", ctx.cover("large"), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.albumInfo == null ? null : ctx.albumInfo.wiki == null ? null : ctx.albumInfo.wiki.summary, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", ctx.albumInfo == null ? null : ctx.albumInfo.url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.albumInfo == null ? null : ctx.albumInfo.tags);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/song/album/", ctx.albumId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.albumInfo == null ? null : ctx.albumInfo.url);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardImage, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardActions, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChip], styles: [".album-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n}\n\nmat-card-subtitle[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0YiLCJmaWxlIjoiYWxidW0tZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFsYnVtLWNhcmQge1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG5tYXQtY2FyZC1zdWJ0aXRsZSB7XG4gIGN1cnNvcjogcG9pbnRlciA7XG59XG4iXX0= */"] });


/***/ }),

/***/ 6747:
/*!***************************************************!*\
  !*** ./src/app/album/album-list-new.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumListNewComponent": () => (/* binding */ AlbumListNewComponent)
/* harmony export */ });
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/paging.model */ 8080);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1569);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2014);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1082);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout */ 5224);
/* harmony import */ var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/flex-layout/grid */ 2465);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/flex-layout/flex */ 8669);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _album_cover_new_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./album-cover.new.component */ 7113);















const _c0 = ["input"];
function AlbumListNewComponent_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-album-cover-new", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const album_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("album", album_r3);
} }
class AlbumListNewComponent {
    constructor(albumService, mediaObserver) {
        this.albumService = albumService;
        this.mediaObserver = mediaObserver;
        this.total = 0;
        this.linesPerPage = 0;
        this.columnsPerpage = 5;
        this.pageSize = 5;
        this.pageSizeOptions = [1, 2, 3, 4, 5, 6];
        this.pageIndex = 0;
        mediaObserver.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.filter)((changes) => changes.length > 0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((changes) => changes[0])).subscribe((change) => {
            switch (change.mqAlias) {
                case 'xs':
                    this.initPaginator(1);
                    break;
                case 'sm':
                    this.initPaginator(3);
                    break;
                case 'md':
                    this.initPaginator(4);
                    break;
                case 'lg':
                    this.initPaginator(5);
                    break;
            }
        });
    }
    ngOnInit() {
        this.fetchAlbums("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging(0, this.pageSize, "title", "asc"));
    }
    initPaginator(numcols) {
        if (this.linesPerPage === 0) {
            if (localStorage.getItem("albumLinesPerPage")) {
                this.linesPerPage = +localStorage.getItem("albumLinesPerPage");
            }
            else {
                this.linesPerPage = 1;
            }
        }
        this.columnsPerpage = numcols;
        this.pageSizeOptions = [1 * numcols, 2 * numcols, 3 * numcols, 4 * numcols, 5 * numcols, 6 * numcols];
        this.pageSize = this.linesPerPage * numcols;
    }
    ngAfterViewInit() {
        this.paginator.page.subscribe($event => {
            this.linesPerPage = $event.pageSize / this.columnsPerpage;
            localStorage.setItem("albumLinesPerPage", "" + ($event.pageSize / this.columnsPerpage));
            this.fetchAlbums("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging($event.pageIndex, $event.pageSize, "title", "asc"));
        });
        // server-side search
        (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this.input.nativeElement, 'keyup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(150), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)(() => {
            this.paginator.pageIndex = 0;
            this.fetchAlbums(this.input.nativeElement.value, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging(0, this.pageSize, "title", "asc"));
        }))
            .subscribe();
    }
    fetchAlbums(filter, paging) {
        this.albumService.getAllAlbums(filter, paging).subscribe(albums => {
            this.albums = albums.albums;
            this.total = albums.total;
        });
    }
}
AlbumListNewComponent.ɵfac = function AlbumListNewComponent_Factory(t) { return new (t || AlbumListNewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_album_service__WEBPACK_IMPORTED_MODULE_1__.AlbumService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__.MediaObserver)); };
AlbumListNewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AlbumListNewComponent, selectors: [["app-album-list-new"]], viewQuery: function AlbumListNewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, decls: 14, vars: 6, consts: [["gdAreas", "header | content | footer", "gdGap", "16px", "gdRows", "auto auto auto"], ["gdArea", "header"], ["matInput", ""], ["input", ""], ["gdArea", "content"], ["fxLayout", "row wrap", "fxLayout.lt-sm", "column", "fxLayoutGap", "5px", "fxLayoutAlign", "flex-start", 1, "album", "full-container"], [4, "ngFor", "ngForOf"], ["gdArea", "footer"], [3, "length", "pageSize", "pageIndex", "pageSizeOptions", "showFirstLastButtons"], ["paginator", ""], ["fxFlex", "0 1 calc(20% - 5px)", "fxFlex.lt-lg", "0 1 calc(25% - 5px)", "fxFlex.lt-md", "0 1 calc(33.3% - 5px)", "fxFlex.lt-sm", "0 1 calc(50% - 5px)", 3, "album"]], template: function AlbumListNewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-placeholder");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, AlbumListNewComponent_ng_container_10_Template, 2, 1, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "mat-paginator", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.albums);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("length", ctx.total)("pageSize", ctx.pageSize)("pageIndex", ctx.pageIndex)("pageSizeOptions", ctx.pageSizeOptions)("showFirstLastButtons", true);
    } }, directives: [_angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_12__.DefaultGridAreasDirective, _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_12__.DefaultGridGapDirective, _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_12__.DefaultGridRowsDirective, _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_12__.DefaultGridAreaDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatPlaceholder, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_16__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_16__.DefaultLayoutGapDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_16__.DefaultLayoutAlignDirective, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, _album_cover_new_component__WEBPACK_IMPORTED_MODULE_2__.AlbumCoverNewComponent, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_16__.DefaultFlexDirective], styles: [".full-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWxpc3QtbmV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJhbGJ1bS1saXN0LW5ldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mdWxsLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4iXX0= */"] });


/***/ }),

/***/ 5804:
/*!***********************************************!*\
  !*** ./src/app/album/album-list.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumListComponent": () => (/* binding */ AlbumListComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/paging.model */ 8080);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1082);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/layout */ 9339);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/grid-list */ 5409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 3252);














const _c0 = ["input"];
function AlbumListComponent_mat_grid_tile_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-grid-tile");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const album_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/album/", album_r3.albumId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r1.cover(album_r3), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
} }
class AlbumListComponent {
    constructor(albumService, changeDetectorRef, media) {
        this.albumService = albumService;
        this.pageSize = 12;
        this.pageSizeOptions = [6, 12, 24, 48];
        this.total = 0;
        this.pageIndex = 0;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit() {
        this.fetchAlbums("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging(0, this.pageSize, "title", "asc"));
    }
    ngAfterViewInit() {
        this.paginator.page.subscribe($event => {
            this.fetchAlbums("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging($event.pageIndex, $event.pageSize, "title", "asc"));
        });
        // server-side search
        (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.fromEvent)(this.input.nativeElement, 'keyup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(150), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(() => {
            this.paginator.pageIndex = 0;
            this.fetchAlbums(this.input.nativeElement.value, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging(0, this.pageSize, "title", "asc"));
        }))
            .subscribe();
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    cover(album) {
        if (album === null || album === undefined) {
            return "../assets/img/defaultAlbum.png";
        }
        return this.albumService.albumCoverUrl(album);
    }
    fetchAlbums(filter, paging) {
        this.albumService.getAllAlbums(filter, paging).subscribe(albums => {
            this.albums = albums.albums;
            this.total = albums.total;
        });
    }
}
AlbumListComponent.ɵfac = function AlbumListComponent_Factory(t) { return new (t || AlbumListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_album_service__WEBPACK_IMPORTED_MODULE_1__.AlbumService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__.MediaMatcher)); };
AlbumListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AlbumListComponent, selectors: [["app-album-list"]], viewQuery: function AlbumListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, decls: 11, vars: 7, consts: [[1, "artist"], ["matInput", ""], ["input", ""], ["rowHeight", "1:1", 3, "cols"], [4, "ngFor", "ngForOf"], [3, "length", "pageSize", "pageIndex", "pageSizeOptions", "showFirstLastButtons"], ["paginator", ""], [3, "routerLink"], [1, "cover", 3, "src"]], template: function AlbumListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-placeholder");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-grid-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, AlbumListComponent_mat_grid_tile_8_Template, 3, 2, "mat-grid-tile", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "mat-paginator", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("cols", ctx.mobileQuery.matches ? 2 : 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.albums);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("length", ctx.total)("pageSize", ctx.pageSize)("pageIndex", ctx.pageIndex)("pageSizeOptions", ctx.pageSizeOptions)("showFirstLastButtons", true);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatPlaceholder, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_12__.MatGridList, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginator, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_12__.MatGridTile, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLinkWithHref], styles: [".cover[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsYnVtLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0YiLCJmaWxlIjoiYWxidW0tbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb3ZlciB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iXX0= */"] });


/***/ }),

/***/ 2450:
/*!***********************************************!*\
  !*** ./src/app/album/album-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumRoutingModule": () => (/* binding */ AlbumRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _album_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./album-list.component */ 5804);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _album_list_new_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./album-list-new.component */ 6747);
/* harmony import */ var _album_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./album-detail.component */ 4867);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);







const albumRoutes = [
    { path: 'album', component: _album_list_component__WEBPACK_IMPORTED_MODULE_0__.AlbumListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__.AuthGuardService] },
    { path: 'album-new', component: _album_list_new_component__WEBPACK_IMPORTED_MODULE_2__.AlbumListNewComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__.AuthGuardService] },
    { path: 'album/:id', component: _album_detail_component__WEBPACK_IMPORTED_MODULE_3__.AlbumDetailComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__.AuthGuardService] }
];
class AlbumRoutingModule {
}
AlbumRoutingModule.ɵfac = function AlbumRoutingModule_Factory(t) { return new (t || AlbumRoutingModule)(); };
AlbumRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AlbumRoutingModule });
AlbumRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(albumRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AlbumRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 7455:
/*!**************************************!*\
  !*** ./src/app/album/album.model.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Album": () => (/* binding */ Album),
/* harmony export */   "AlbumCollection": () => (/* binding */ AlbumCollection)
/* harmony export */ });
class Album {
    constructor(albumId, title, path, artist, info) {
        this.albumId = albumId;
        this.title = title;
        this.path = path;
        this.artist = artist;
        this.info = info;
    }
}
class AlbumCollection {
    constructor(albums, paging, total) {
        this.albums = albums;
        this.paging = paging;
        this.total = total;
    }
}


/***/ }),

/***/ 9263:
/*!***************************************!*\
  !*** ./src/app/album/album.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumModule": () => (/* binding */ AlbumModule)
/* harmony export */ });
/* harmony import */ var _album_cover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./album-cover.component */ 6166);
/* harmony import */ var _album_cover_new_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./album-cover.new.component */ 7113);
/* harmony import */ var _album_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./album-list.component */ 5804);
/* harmony import */ var _album_list_new_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./album-list-new.component */ 6747);
/* harmony import */ var _album_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./album.service */ 3283);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ 8001);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/grid-list */ 5409);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 4731);
/* harmony import */ var _album_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./album-detail.component */ 4867);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/chips */ 1933);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);




















class AlbumModule {
}
AlbumModule.ɵfac = function AlbumModule_Factory(t) { return new (t || AlbumModule)(); };
AlbumModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AlbumModule });
AlbumModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [
        _album_service__WEBPACK_IMPORTED_MODULE_4__.AlbumService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__.FlexLayoutModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule,
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_13__.MatChipsModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormFieldModule,
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__.MatGridListModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_18__.MatPaginatorModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltipModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AlbumModule, { declarations: [_album_cover_component__WEBPACK_IMPORTED_MODULE_0__.AlbumCoverComponent,
        _album_cover_new_component__WEBPACK_IMPORTED_MODULE_1__.AlbumCoverNewComponent,
        _album_list_component__WEBPACK_IMPORTED_MODULE_2__.AlbumListComponent,
        _album_list_new_component__WEBPACK_IMPORTED_MODULE_3__.AlbumListNewComponent,
        _album_detail_component__WEBPACK_IMPORTED_MODULE_5__.AlbumDetailComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__.FlexLayoutModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_13__.MatChipsModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormFieldModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_18__.MatPaginatorModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltipModule], exports: [_album_list_component__WEBPACK_IMPORTED_MODULE_2__.AlbumListComponent,
        _album_list_new_component__WEBPACK_IMPORTED_MODULE_3__.AlbumListNewComponent,
        _album_detail_component__WEBPACK_IMPORTED_MODULE_5__.AlbumDetailComponent] }); })();


/***/ }),

/***/ 3283:
/*!****************************************!*\
  !*** ./src/app/album/album.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlbumService": () => (/* binding */ AlbumService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _song_song_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../song/song.service */ 6735);
/* harmony import */ var _security_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../security/auth.service */ 7829);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 6219);








class AlbumService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService {
    constructor(http, songService, authService, sanitizer) {
        super();
        this.http = http;
        this.songService = songService;
        this.authService = authService;
        this.sanitizer = sanitizer;
    }
    getAllAlbums(filter, paging) {
        let parameter = this.getPagingForUrl(paging);
        if (filter !== null && filter !== undefined && filter !== "") {
            if (parameter === "") {
                parameter = "?filter=" + filter;
            }
            else {
                parameter += "&filter=" + filter;
            }
        }
        if (parameter === "") {
            parameter = "?title=notempty";
        }
        else {
            parameter += "&title=notempty";
        }
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album" + parameter);
    }
    getAlbum(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + id);
    }
    getAlbumInfo(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + id + "/info");
    }
    getCover(album) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + album.albumId + "/cover", {
            responseType: 'blob'
        })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((res) => {
            const urlCreator = window.URL;
            return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
        }));
    }
    albumCoverUrl(album) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + album.albumId + "/cover?bearer=" + this.authService.getToken();
    }
}
AlbumService.ɵfac = function AlbumService_Factory(t) { return new (t || AlbumService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_song_song_service__WEBPACK_IMPORTED_MODULE_2__.SongService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_security_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer)); };
AlbumService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: AlbumService, factory: AlbumService.ɵfac });


/***/ }),

/***/ 3696:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);



const appRoutes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] }); })();


/***/ }),

/***/ 2050:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./security/auth.service */ 7829);
/* harmony import */ var _player_player_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player/player.service */ 7143);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 2132);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/layout */ 9339);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3479);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ 7727);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/sidenav */ 1986);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/divider */ 5152);
/* harmony import */ var _player_player_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player/player.component */ 9087);
















function AppComponent_mat_list_item_63_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "bug_report");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_button_73_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_button_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_button_77_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_button_77_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r10.gotoConfig(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "build");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_button_78_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_button_78_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r12.gotoUsermanagement(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "people");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function AppComponent_button_79_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_button_79_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r14.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "power_settings_new");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](4, 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18nExp"](ctx_r8.username());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18nApply"](4);
} }
const _c30 = function () { return ["/overview"]; };
class AppComponent {
    constructor(router, authService, playerService, bottomPlayerSheet, changeDetectorRef, media) {
        this.router = router;
        this.authService = authService;
        this.playerService = playerService;
        this.bottomPlayerSheet = bottomPlayerSheet;
        this.theme = 'indigo-pink-light';
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        if (localStorage.getItem("theme") !== null) {
            this.theme = localStorage.getItem("theme");
        }
        this.authService.isLoggedIn.subscribe(b => {
            if (b) {
                this.playerService.loadPlayqueue();
            }
        });
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    currentTheme() {
        return { [this.theme]: true };
    }
    setCurrentTheme(theme) {
        this.theme = theme;
        localStorage.setItem("theme", theme);
    }
    goHome() {
        this.router.navigate(["/"]);
    }
    gotoConfig() {
        this.router.navigate(["/config"]);
    }
    gotoUsermanagement() {
        this.router.navigate(["/user"]);
    }
    logout() {
        this.authService.logout();
    }
    isLoggedIn() {
        return this.authService.isLoggedIn;
    }
    isAdmin() {
        return this.authService.isAdmin();
    }
    username() {
        return this.authService.getLoggedInUsername();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_security_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_player_player_service__WEBPACK_IMPORTED_MODULE_1__.PlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_5__.MatBottomSheet), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_6__.MediaMatcher)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 143, vars: 26, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navDashboard$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Overview");
        i18n_0 = MSG_EXTERNAL_navDashboard$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:@@navDashboard␟e95ae009d0bdb45fcc656e8b65248cf7396080d5␟2614607010577950577:Overview`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navText$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_3 = goog.getMsg("Playlists");
        i18n_2 = MSG_EXTERNAL_navText$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:@@navText␟47546e45bbb476baaaad38244db444c427ddc502␟1823843876735462104:Playlists`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navData$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_5 = goog.getMsg("Artists");
        i18n_4 = MSG_EXTERNAL_navData$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:@@navData␟bbf3ee7d6f1cb9245fcca88ab7de629dfc0dcfa4␟4980580439123922024:Artists`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navData$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_7 = goog.getMsg("Artists (new)");
        i18n_6 = MSG_EXTERNAL_navData$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:@@navData␟b721191ae14c355cfae3f90bc7b26636cb13c2dd␟1660083653143367306:Artists (new)`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_9 = goog.getMsg("Albums");
        i18n_8 = MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:@@navUsers␟c8fde66a0022d09a6ec0d3844568e486381d797f␟5043933900720743682:Albums`;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_11 = goog.getMsg("Age");
        i18n_10 = MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_11;
    }
    else {
        i18n_10 = $localize `:@@navUsers␟2e6be334a2152f179a557167f98ce4459ff9a2f9␟1130652265542107236:Age`;
    } let i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_13 = goog.getMsg("Genre");
        i18n_12 = MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_13;
    }
    else {
        i18n_12 = $localize `:@@navUsers␟81b090ca8b0d1629d26b369ac21fa7c4d3191c0f␟7599424290971072767:Genre`;
    } let i18n_14; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_15 = goog.getMsg("Songs");
        i18n_14 = MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_15;
    }
    else {
        i18n_14 = $localize `:@@navUsers␟a37cfde66e15101d640de7b86c995cd65b18f8ec␟7783345534551124847:Songs`;
    } let i18n_16; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuHelp$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_17 = goog.getMsg("Help");
        i18n_16 = MSG_EXTERNAL_menuHelp$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS_17;
    }
    else {
        i18n_16 = $localize `:@@menuHelp␟85b79c9064aed1ead31ace985f31aa1363f6bdaf␟7911416166208830577:Help`;
    } let i18n_18; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__19 = goog.getMsg("Management");
        i18n_18 = MSG_EXTERNAL_navUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__19;
    }
    else {
        i18n_18 = $localize `:@@navUsers␟01bbcfc78a5595d74ff42d1a19f2fc0c88356edf␟7615147220727762615:Management`;
    } let i18n_20; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuLogin$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__21 = goog.getMsg("Login");
        i18n_20 = MSG_EXTERNAL_menuLogin$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__21;
    }
    else {
        i18n_20 = $localize `:@@menuLogin␟6765b4c916060f6bc42d9bb69e80377dbcb5e4e9␟2454050363478003966:Login`;
    } let i18n_22; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuProfile$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__23 = goog.getMsg("Settings");
        i18n_22 = MSG_EXTERNAL_menuProfile$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__23;
    }
    else {
        i18n_22 = $localize `:@@menuProfile␟121cc5391cd2a5115bc2b3160379ee5b36cd7716␟4930506384627295710:Settings`;
    } let i18n_24; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuConfig$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__25 = goog.getMsg("Administration");
        i18n_24 = MSG_EXTERNAL_menuConfig$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__25;
    }
    else {
        i18n_24 = $localize `:@@menuConfig␟b7648e7aced164498aa843b5c4e8f2f1c36a7919␟7844706011418789951:Administration`;
    } let i18n_26; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__27 = goog.getMsg("Usermanagement");
        i18n_26 = MSG_EXTERNAL_menuUsers$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__27;
    }
    else {
        i18n_26 = $localize `:@@menuUsers␟766b81d9f7526a933bf4cb747f23768808ef3797␟2551651193711162260:Usermanagement`;
    } let i18n_28; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_menuLogout$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__29 = goog.getMsg("Logout {$interpolation}", { "interpolation": "\uFFFD0\uFFFD" });
        i18n_28 = MSG_EXTERNAL_menuLogout$$_______________USERS_BERNMIC_IDEAPROJECTS_GO2MUSIC_FRONTEND_SRC_APP_APP_COMPONENT_TS__29;
    }
    else {
        i18n_28 = $localize `:@@menuLogout␟7a3a34328a994bf78b0fda185b91c6de825f861e␟4069671824532918070:Logout ${"\uFFFD0\uFFFD"}:INTERPOLATION:`;
    } return [[3, "ngClass"], [1, "main-container"], ["color", "primary", 1, "main-navbar"], ["mat-icon-button", "", 3, "click"], [1, "app-name", 3, "click"], [1, "navbar-spacer"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], [1, "navbar-icon"], [1, "left-sidenav-container"], ["fixedTopGap", "56", 3, "opened", "mode", "fixedInViewport"], ["lsnav", ""], ["routerLinkActive", "active", 1, "mat-primary", 3, "routerLink"], ["matListIcon", "", "color", "accent"], i18n_0, ["routerLinkActive", "active", "routerLink", "playlist"], i18n_2, ["routerLinkActive", "active", "routerLink", "artist"], i18n_4, ["routerLinkActive", "active", "routerLink", "artist-new"], i18n_6, ["routerLinkActive", "active", "routerLink", "album-new"], i18n_8, ["routerLinkActive", "active", "routerLink", "age"], i18n_10, ["routerLinkActive", "active", "routerLink", "genre"], i18n_12, ["routerLinkActive", "active", "routerLink", "song"], i18n_14, ["routerLinkActive", "active", "routerLink", "management", 4, "ngIf"], ["id", "version"], ["position", "end", "fixedTopGap", "56", 3, "mode", "fixedInViewport"], ["rsnav", ""], [1, "main"], ["userMenu", "matMenu"], ["mat-menu-item", "", "routerLink", "/login", 4, "ngIf"], ["mat-menu-item", "", 4, "ngIf"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", ""], i18n_16, ["themeMenu", "matMenu"], ["mat-subheader", ""], ["mat-menu-item", "", 3, "click"], ["routerLinkActive", "active", "routerLink", "management"], i18n_18, ["mat-menu-item", "", "routerLink", "/login"], i18n_20, i18n_22, i18n_24, i18n_26, i18n_28]; }, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](20); return _r0.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_h1_click_6_listener() { return ctx.goHome(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Go2Music");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "format_color_fill");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "person");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r16); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](67); return _r2.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "more_vert");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "mat-sidenav-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "mat-sidenav", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "mat-list-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](26, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](27, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "mat-list-item", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "featured_play_list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](32, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "mat-list-item", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "people");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](37, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "mat-list-item", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "people");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](42, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "mat-list-item", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, "album");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](47, 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "mat-list-item", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "date_range");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](52, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "mat-list-item", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, "toys");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](57, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "mat-list-item", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "mat-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "library_music");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](62, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](63, AppComponent_mat_list_item_63_Template, 5, 0, "mat-list-item", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](65, "0.3.0");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "mat-sidenav", 30, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](68, "app-player");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "mat-sidenav-content", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](70, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "mat-menu", null, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](73, AppComponent_button_73_Template, 5, 0, "button", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](74, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](75, AppComponent_button_75_Template, 5, 0, "button", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](76, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](77, AppComponent_button_77_Template, 5, 0, "button", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](78, AppComponent_button_78_Template, 5, 0, "button", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](79, AppComponent_button_79_Template, 5, 1, "button", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](80, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "button", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83, "help");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](85, 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](86, "mat-menu", null, 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](88, "h4", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](89, "Light Themes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_90_listener() { return ctx.setCurrentTheme("indigo-pink-light"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](92, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](94, "Indigo Pink");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_95_listener() { return ctx.setCurrentTheme("deeppurple-amber-light"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](97, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](99, "Deeppurple Amber");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_100_listener() { return ctx.setCurrentTheme("pink-bluegray-light"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](102, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](103, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](104, "Pink Bluegray");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_105_listener() { return ctx.setCurrentTheme("purple-green-light"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](107, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, "Purple Green");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_110_listener() { return ctx.setCurrentTheme("brown-lime-light"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](114, "Brown Lime");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](115, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "h4", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, "Dark Themes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_118_listener() { return ctx.setCurrentTheme("indigo-pink-dark"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](119, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](120, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](122, "Indigo Pink");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](123, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_123_listener() { return ctx.setCurrentTheme("deeppurple-amber-dark"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](124, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](125, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](127, "Deeppurple Amber");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](128, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_128_listener() { return ctx.setCurrentTheme("pink-bluegray-dark"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](129, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](130, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](131, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](132, "Pink Bluegray");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_133_listener() { return ctx.setCurrentTheme("purple-green-dark"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](134, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](135, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](137, "Purple Green");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "button", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AppComponent_Template_button_click_138_listener() { return ctx.setCurrentTheme("brown-lime-dark"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](139, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](140, "fiber_manual_record");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](142, "Brown Lime");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](72);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](87);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.currentTheme());
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("is-mobile", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matMenuTriggerFor", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matMenuTriggerFor", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("margin-top", ctx.mobileQuery.matches ? 56 : 0, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("opened", !ctx.mobileQuery.matches)("mode", ctx.mobileQuery.matches ? "over" : "side")("fixedInViewport", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](25, _c30));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAdmin());
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("mode", ctx.mobileQuery.matches ? "over" : "side")("fixedInViewport", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](74, 19, ctx.isLoggedIn()));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](76, 21, ctx.isLoggedIn()));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAdmin());
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAdmin());
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](80, 23, ctx.isLoggedIn()));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_8__.DefaultClassDirective, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuTrigger, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatSidenavContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatSidenav, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatNavList, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListItem, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkActive, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListIconCssMatStyler, _angular_material_divider__WEBPACK_IMPORTED_MODULE_15__.MatDivider, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _player_player_component__WEBPACK_IMPORTED_MODULE_2__.PlayerComponent, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_13__.MatSidenavContent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuItem, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListSubheaderCssMatStyler], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe], styles: [".main-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.left-sidenav-container[_ngcontent-%COMP%] {\n  \n  flex: 1;\n}\n\n.is-mobile[_ngcontent-%COMP%]   .left-sidenav-container[_ngcontent-%COMP%] {\n  \n  flex: 1 0 auto;\n}\n\nmat-sidenav-content.main[_ngcontent-%COMP%] {\n  padding: 6px;\n}\n\n.is-mobile[_ngcontent-%COMP%]   .main-navbar[_ngcontent-%COMP%] {\n  position: fixed;\n  \n  z-index: 2;\n}\n\n.navbar-spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\nh1.app-name[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  cursor: pointer;\n}\n\n.navbar-icon[_ngcontent-%COMP%] {\n  padding: 0 14px;\n}\n\nfooter[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n\n#version[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtBQUNGOztBQUVBO0VBQ0U7MEZBQUE7RUFFQSxPQUFBO0FBQ0Y7O0FBRUE7RUFDRTsrREFBQTtFQUVBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSw4RUFBQTtFQUNBLFVBQUE7QUFDRjs7QUFHQTtFQUNFLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtBQUFGOztBQUdBO0VBQ0UsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtBQUFGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xufVxuXG4ubGVmdC1zaWRlbmF2LWNvbnRhaW5lciB7XG4gIC8qIFdoZW4gdGhlIHNpZGVuYXYgaXMgbm90IGZpeGVkLCBzdHJldGNoIHRoZSBzaWRlbmF2IGNvbnRhaW5lciB0byBmaWxsIHRoZSBhdmFpbGFibGUgc3BhY2UuIFRoaXNcbiAgICAgY2F1c2VzIGA8bWF0LXNpZGVuYXYtY29udGVudD5gIHRvIGFjdCBhcyBvdXIgc2Nyb2xsaW5nIGVsZW1lbnQgZm9yIGRlc2t0b3AgbGF5b3V0cy4gKi9cbiAgZmxleDogMTtcbn1cblxuLmlzLW1vYmlsZSAubGVmdC1zaWRlbmF2LWNvbnRhaW5lciB7XG4gIC8qIFdoZW4gdGhlIHNpZGVuYXYgaXMgZml4ZWQsIGRvbid0IGNvbnN0cmFpbiB0aGUgaGVpZ2h0IG9mIHRoZSBzaWRlbmF2IGNvbnRhaW5lci4gVGhpcyBhbGxvd3MgdGhlXG4gICAgIGA8Ym9keT5gIHRvIGJlIG91ciBzY3JvbGxpbmcgZWxlbWVudCBmb3IgbW9iaWxlIGxheW91dHMuICovXG4gIGZsZXg6IDEgMCBhdXRvO1xufVxuXG5tYXQtc2lkZW5hdi1jb250ZW50Lm1haW4ge1xuICBwYWRkaW5nOiA2cHg7XG59XG5cbi5pcy1tb2JpbGUgLm1haW4tbmF2YmFyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICAvKiBNYWtlIHN1cmUgdGhlIHRvb2xiYXIgd2lsbCBzdGF5IG9uIHRvcCBvZiB0aGUgY29udGVudCBhcyBpdCBzY3JvbGxzIHBhc3QuICovXG4gIHotaW5kZXg6IDI7XG59XG5cblxuLm5hdmJhci1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuaDEuYXBwLW5hbWUge1xuICBtYXJnaW4tbGVmdDogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5uYXZiYXItaWNvbiB7XG4gIHBhZGRpbmc6IDAgMTRweDtcbn1cblxuZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cblxuI3ZlcnNpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 4750:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 2050);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/flex-layout */ 8001);
/* harmony import */ var _album_album_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./album/album.module */ 9263);
/* harmony import */ var _artist_artist_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./artist/artist.module */ 7445);
/* harmony import */ var _song_song_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./song/song.module */ 3387);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/shared.module */ 1382);
/* harmony import */ var _overview_overview_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./overview/overview.module */ 393);
/* harmony import */ var _playlist_playlist_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./playlist/playlist.module */ 2569);
/* harmony import */ var _config_config_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/config.module */ 6550);
/* harmony import */ var _user_user_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user/user.module */ 3765);
/* harmony import */ var _player_player_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./player/player.module */ 5070);
/* harmony import */ var _security_security_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./security/security.module */ 7401);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/platform-browser/animations */ 2650);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-routing.module */ 3696);
/* harmony import */ var _album_album_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./album/album-routing.module */ 2450);
/* harmony import */ var _artist_artist_routing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./artist/artist-routing.module */ 5359);
/* harmony import */ var _user_user_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./user/user-routing.module */ 591);
/* harmony import */ var _config_config_routing_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./config/config-routing.module */ 3624);
/* harmony import */ var _song_song_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./song/song-routing.module */ 143);
/* harmony import */ var _overview_overview_routing_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./overview/overview-routing.module */ 7710);
/* harmony import */ var _security_security_routing_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./security/security-routing.module */ 6072);
/* harmony import */ var _playlist_playlist_routing_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./playlist/playlist-routing.module */ 9964);
/* harmony import */ var _management_management_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./management/management.module */ 8409);
/* harmony import */ var _management_management_routing_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./management/management-routing.module */ 6146);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 2132);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/sidenav */ 1986);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/toolbar */ 7727);
/* harmony import */ var _age_age_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./age/age.module */ 7841);
/* harmony import */ var _age_age_routing_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./age/age-routing.module */ 9605);
/* harmony import */ var _genre_genre_routing_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./genre/genre-routing.module */ 430);
/* harmony import */ var _genre_genre_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./genre/genre.module */ 971);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 4001);





































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__.BrowserAnimationsModule,
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_29__.FlexLayoutModule,
            _age_age_routing_module__WEBPACK_IMPORTED_MODULE_23__.AgeRoutingModule,
            _album_album_routing_module__WEBPACK_IMPORTED_MODULE_12__.AlbumRoutingModule,
            _artist_artist_routing_module__WEBPACK_IMPORTED_MODULE_13__.ArtistRoutingModule,
            _config_config_routing_module__WEBPACK_IMPORTED_MODULE_15__.ConfigRoutingModule,
            _genre_genre_routing_module__WEBPACK_IMPORTED_MODULE_24__.GenreRoutingModule,
            _management_management_routing_module__WEBPACK_IMPORTED_MODULE_21__.ManagementRoutingModule,
            _overview_overview_routing_module__WEBPACK_IMPORTED_MODULE_17__.OverviewRoutingModule,
            _playlist_playlist_routing_module__WEBPACK_IMPORTED_MODULE_19__.PlaylistRoutingModule,
            _security_security_routing_module__WEBPACK_IMPORTED_MODULE_18__.SecurityRoutingModule,
            _song_song_routing_module__WEBPACK_IMPORTED_MODULE_16__.SongRoutingModule,
            _user_user_routing_module__WEBPACK_IMPORTED_MODULE_14__.UserRoutingModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_11__.AppRoutingModule,
            _age_age_module__WEBPACK_IMPORTED_MODULE_22__.AgeModule,
            _album_album_module__WEBPACK_IMPORTED_MODULE_1__.AlbumModule,
            _artist_artist_module__WEBPACK_IMPORTED_MODULE_2__.ArtistModule,
            _config_config_module__WEBPACK_IMPORTED_MODULE_7__.ConfigModule,
            _genre_genre_module__WEBPACK_IMPORTED_MODULE_25__.GenreModule,
            _management_management_module__WEBPACK_IMPORTED_MODULE_20__.ManagementModule,
            _overview_overview_module__WEBPACK_IMPORTED_MODULE_5__.OverviewModule,
            _player_player_module__WEBPACK_IMPORTED_MODULE_9__.PlayerModule,
            _playlist_playlist_module__WEBPACK_IMPORTED_MODULE_6__.PlaylistModule,
            _security_security_module__WEBPACK_IMPORTED_MODULE_10__.SecurityModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule,
            _song_song_module__WEBPACK_IMPORTED_MODULE_3__.SongModule,
            _user_user_module__WEBPACK_IMPORTED_MODULE_8__.UserModule,
            _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_30__.MatBottomSheetModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_31__.MatButtonModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_32__.MatIconModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_33__.MatListModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__.MatMenuModule,
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__.MatSidenavModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__.MatToolbarModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.BrowserModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_28__.BrowserAnimationsModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_29__.FlexLayoutModule,
        _age_age_routing_module__WEBPACK_IMPORTED_MODULE_23__.AgeRoutingModule,
        _album_album_routing_module__WEBPACK_IMPORTED_MODULE_12__.AlbumRoutingModule,
        _artist_artist_routing_module__WEBPACK_IMPORTED_MODULE_13__.ArtistRoutingModule,
        _config_config_routing_module__WEBPACK_IMPORTED_MODULE_15__.ConfigRoutingModule,
        _genre_genre_routing_module__WEBPACK_IMPORTED_MODULE_24__.GenreRoutingModule,
        _management_management_routing_module__WEBPACK_IMPORTED_MODULE_21__.ManagementRoutingModule,
        _overview_overview_routing_module__WEBPACK_IMPORTED_MODULE_17__.OverviewRoutingModule,
        _playlist_playlist_routing_module__WEBPACK_IMPORTED_MODULE_19__.PlaylistRoutingModule,
        _security_security_routing_module__WEBPACK_IMPORTED_MODULE_18__.SecurityRoutingModule,
        _song_song_routing_module__WEBPACK_IMPORTED_MODULE_16__.SongRoutingModule,
        _user_user_routing_module__WEBPACK_IMPORTED_MODULE_14__.UserRoutingModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_11__.AppRoutingModule,
        _age_age_module__WEBPACK_IMPORTED_MODULE_22__.AgeModule,
        _album_album_module__WEBPACK_IMPORTED_MODULE_1__.AlbumModule,
        _artist_artist_module__WEBPACK_IMPORTED_MODULE_2__.ArtistModule,
        _config_config_module__WEBPACK_IMPORTED_MODULE_7__.ConfigModule,
        _genre_genre_module__WEBPACK_IMPORTED_MODULE_25__.GenreModule,
        _management_management_module__WEBPACK_IMPORTED_MODULE_20__.ManagementModule,
        _overview_overview_module__WEBPACK_IMPORTED_MODULE_5__.OverviewModule,
        _player_player_module__WEBPACK_IMPORTED_MODULE_9__.PlayerModule,
        _playlist_playlist_module__WEBPACK_IMPORTED_MODULE_6__.PlaylistModule,
        _security_security_module__WEBPACK_IMPORTED_MODULE_10__.SecurityModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule,
        _song_song_module__WEBPACK_IMPORTED_MODULE_3__.SongModule,
        _user_user_module__WEBPACK_IMPORTED_MODULE_8__.UserModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_30__.MatBottomSheetModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_31__.MatButtonModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_32__.MatIconModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_33__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__.MatMenuModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_35__.MatSidenavModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_36__.MatToolbarModule] }); })();


/***/ }),

/***/ 3794:
/*!***************************************************!*\
  !*** ./src/app/artist/artist-detail.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistDetailComponent": () => (/* binding */ ArtistDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _artist_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artist.service */ 7234);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/chips */ 1933);







const _c0 = function (a0) { return { filter: a0 }; };
function ArtistDetailComponent_mat_chip_list_13_mat_chip_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const artist_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("queryParams", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, artist_r4.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](artist_r4.name);
} }
function ArtistDetailComponent_mat_chip_list_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ArtistDetailComponent_mat_chip_list_13_mat_chip_1_Template, 2, 4, "mat-chip", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.artistInfo.similar.artist);
} }
function ArtistDetailComponent_mat_chip_list_17_mat_chip_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tag_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](tag_r6.name);
} }
function ArtistDetailComponent_mat_chip_list_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ArtistDetailComponent_mat_chip_list_17_mat_chip_1_Template, 2, 1, "mat-chip", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.artistInfo.tags.tag);
} }
function ArtistDetailComponent_a_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "last.fm");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx_r2.artistInfo.url, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
class ArtistDetailComponent {
    constructor(router, route, artistService) {
        this.router = router;
        this.route = route;
        this.artistService = artistService;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (params.get('id') === null) {
                return;
            }
            this.artistId = params.get("id");
            this.artistService.getArtistInfo(params.get('id')).subscribe(a => {
                this.artistInfo = a.info;
                this.artist = a;
                this.artistId = a.artistId;
            });
        });
    }
    cover(size) {
        if (this.artistInfo !== null && this.artistInfo !== undefined && this.artistInfo.image != null && this.artistInfo.image !== undefined) {
            for (let image of this.artistInfo.image) {
                if (image["size"] === size) {
                    return image["#text"];
                }
            }
        }
        return "";
    }
}
ArtistDetailComponent.ɵfac = function ArtistDetailComponent_Factory(t) { return new (t || ArtistDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_artist_service__WEBPACK_IMPORTED_MODULE_0__.ArtistService)); };
ArtistDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ArtistDetailComponent, selectors: [["app-artist-detail"]], decls: 22, vars: 8, consts: [[1, "artist-card"], ["mat-card-image", "", 3, "src"], ["mat-button", "", "target", "_blank", 3, "href"], ["aria-label", "Tags", 4, "ngIf"], ["mat-button", "", 3, "routerLink"], ["mat-button", "", "target", "_blank", 3, "href", 4, "ngIf"], ["aria-label", "Tags"], ["routerLink", "/artist", 3, "queryParams", 4, "ngFor", "ngForOf"], ["routerLink", "/artist", 3, "queryParams"], [4, "ngFor", "ngForOf"]], template: function ArtistDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Read more");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Similar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, ArtistDetailComponent_mat_chip_list_13_Template, 2, 1, "mat-chip-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Tags");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, ArtistDetailComponent_mat_chip_list_17_Template, 2, 1, "mat-chip-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Songs");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, ArtistDetailComponent_a_21_Template, 2, 1, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.artistInfo == null ? null : ctx.artistInfo.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", ctx.cover("large"), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.artistInfo == null ? null : ctx.artistInfo.bio == null ? null : ctx.artistInfo.bio.summary, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("href", ctx.artistInfo == null ? null : ctx.artistInfo.url, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.artistInfo == null ? null : ctx.artistInfo.similar);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.artistInfo == null ? null : ctx.artistInfo.tags);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/song/artist/", ctx.artistId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.artistInfo == null ? null : ctx.artistInfo.url);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardImage, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatAnchor, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardActions, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref, _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChip, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcnRpc3QtZGV0YWlsLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 1896:
/*!*************************************************!*\
  !*** ./src/app/artist/artist-list.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistListComponent": () => (/* binding */ ArtistListComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1082);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var _artist_datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artist.datasource */ 4824);
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/paging.model */ 8080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _artist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./artist.service */ 7234);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);

















const _c0 = ["input"];
function ArtistListComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ArtistListComponent_ng_container_11_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-header-cell", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const column_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](column_r7.title);
} }
function ArtistListComponent_ng_container_11_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-cell", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ArtistListComponent_ng_container_11_mat_cell_2_Template_mat_cell_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13); const artist_r11 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r12.gotoSongs(artist_r11); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const artist_r11 = ctx.$implicit;
    const column_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r9.getProperty(artist_r11, column_r7.name));
} }
function ArtistListComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ArtistListComponent_ng_container_11_mat_header_cell_1_Template, 2, 1, "mat-header-cell", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ArtistListComponent_ng_container_11_mat_cell_2_Template, 2, 1, "mat-cell", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const column_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matColumnDef", column_r7.name);
} }
function ArtistListComponent_mat_header_row_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-header-row");
} }
function ArtistListComponent_mat_row_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-row");
} }
class ArtistListComponent {
    constructor(router, route, artistService) {
        this.router = router;
        this.route = route;
        this.artistService = artistService;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 20, 50];
        this.total = 0;
        this.columnDefs = [
            { name: 'id', title: 'ID' },
            { name: 'name', title: 'Name' }
        ];
        this.displayedColumns = ['name'];
        this.getProperty = (obj, path) => (path.split('.').reduce((o, p) => o && o[p], obj));
    }
    ngAfterViewInit() {
        // server-side search
        (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(this.input.nativeElement, 'keyup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(150), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => {
            this.paginator.pageIndex = 0;
            this.loadArtistsPage();
        }))
            .subscribe();
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.merge)(this.sort.sortChange, this.paginator.page)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this.loadArtistsPage()))
            .subscribe();
    }
    ngOnInit() {
        if (localStorage.getItem("pageSize")) {
            this.pageSize = +localStorage.getItem("pageSize");
        }
        this.dataSource = new _artist_datasource__WEBPACK_IMPORTED_MODULE_0__.ArtistDataSource(this.artistService);
        this.route.queryParams.subscribe((params) => {
            let filter = "";
            if (params["filter"] !== null && params["filter"] !== undefined) {
                filter = params["filter"];
            }
            this.dataSource.loadArtists(filter, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__.Paging(0, this.pageSize, "", "asc"));
            this.dataSource.artistTotalSubject.subscribe(total => {
                this.total = total;
                if (total == 1) {
                    this.dataSource.artistsSubject.subscribe(artists => {
                        if (artists !== null && artists !== undefined && artists.length === 1) {
                            this.router.navigate(["/artist", artists[0].artistId]);
                        }
                    });
                }
            });
        });
    }
    loadArtistsPage() {
        localStorage.setItem("pageSize", "" + this.paginator.pageSize);
        this.dataSource.loadArtists(this.input.nativeElement.value, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__.Paging(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction));
    }
    gotoSongs(artist) {
        //this.router.navigate(["/song/artist/" + artist.artistId]);
        this.router.navigate(["/artist/" + artist.artistId]);
    }
}
ArtistListComponent.ɵfac = function ArtistListComponent_Factory(t) { return new (t || ArtistListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_artist_service__WEBPACK_IMPORTED_MODULE_2__.ArtistService)); };
ArtistListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ArtistListComponent, selectors: [["app-artist-list"]], viewQuery: function ArtistListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_10__.MatSort, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, decls: 16, vars: 11, consts: [[1, "artist"], ["matInput", ""], ["input", ""], ["class", "spinner-container", 4, "ngIf"], ["matSort", "", 1, "artists-table", 3, "dataSource"], ["artisttable", ""], [3, "matColumnDef", 4, "ngFor", "ngForOf"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], [3, "length", "pageSize", "pageSizeOptions", "showFirstLastButtons"], ["paginator", ""], [1, "spinner-container"], [3, "matColumnDef"], ["mat-sort-header", "", 4, "matHeaderCellDef"], [3, "click", 4, "matCellDef"], ["mat-sort-header", ""], [3, "click"]], template: function ArtistListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-placeholder");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, ArtistListComponent_div_7_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-table", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, ArtistListComponent_ng_container_11_Template, 3, 1, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, ArtistListComponent_mat_header_row_12_Template, 1, 0, "mat-header-row", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, ArtistListComponent_mat_row_13_Template, 1, 0, "mat-row", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "mat-paginator", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](8, 9, ctx.dataSource.loading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.columnDefs);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("length", ctx.total)("pageSize", ctx.pageSize)("pageSizeOptions", ctx.pageSizeOptions)("showFirstLastButtons", true);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatPlaceholder, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__.MatSort, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatRowDef, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginator, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__.MatSpinner, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatHeaderCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatRow], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe], styles: [".mat-row[_ngcontent-%COMP%] {\n  min-height: 0px;\n  padding: 2px 0px 2px 0px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-row[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.mat-cell[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-header-cell[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-header-row[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 0 0;\n}\n\n.mat-column-name[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n}\n\n.only-on-hover[_ngcontent-%COMP%] {\n  opacity: 0.25;\n  transition: all ease 0.8s;\n  font-size: 16px;\n  height: 16px;\n  width: 16px;\n  cursor: pointer;\n}\n\n.only-on-hover[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.spinner-container[_ngcontent-%COMP%] {\n  height: 360px;\n  width: 390px;\n  position: fixed;\n}\n\n.artists-table[_ngcontent-%COMP%] {\n  min-height: 360px;\n  margin-top: 10px;\n}\n\n.spinner-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin: 130px auto 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlzdC1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFFRjs7QUFDQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQUVGOztBQUNBO0VBQ0UsY0FBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUNBO0VBQ0UsVUFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQ0E7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQ0E7RUFDRSx5QkFBQTtBQUVGIiwiZmlsZSI6ImFydGlzdC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1yb3cge1xuICBtaW4taGVpZ2h0OiAwcHg7XG4gIHBhZGRpbmc6IDJweCAwcHggMnB4IDBweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5tYXQtcm93OmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubWF0LWNlbGwge1xuICBmb250LXNpemU6IDAuNjZyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuLm1hdC1oZWFkZXItY2VsbCB7XG4gIGZvbnQtc2l6ZTogMC42NnJlbTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5tYXQtaGVhZGVyLXJvdyB7XG4gIG1pbi1oZWlnaHQ6IDQwcHg7XG4gIHBhZGRpbmc6IDAgMDtcbn1cblxuLm1hdC1jb2x1bW4tbmFtZSB7XG4gIGZsZXg6IDAgMCAxMDAlO1xufVxuXG4ub25seS1vbi1ob3ZlciB7XG4gIG9wYWNpdHk6IDAuMjU7XG4gIHRyYW5zaXRpb246IGFsbCBlYXNlIDAuOHM7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ub25seS1vbi1ob3Zlcjpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5zcGlubmVyLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMzYwcHg7XG4gIHdpZHRoOiAzOTBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xufVxuXG4uYXJ0aXN0cy10YWJsZSB7XG4gIG1pbi1oZWlnaHQ6IDM2MHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uc3Bpbm5lci1jb250YWluZXIgbWF0LXNwaW5uZXIge1xuICBtYXJnaW46IDEzMHB4IGF1dG8gMCBhdXRvO1xufVxuIl19 */"] });


/***/ }),

/***/ 2282:
/*!*****************************************************!*\
  !*** ./src/app/artist/artist-new-list.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistNewListComponent": () => (/* binding */ ArtistNewListComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/scrolling */ 9691);
/* harmony import */ var _artist_new_datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artist-new.datasource */ 534);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _artist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./artist.service */ 7234);






function ArtistNewListComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ArtistNewListComponent_li_2_Template_li_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3); const artist_r1 = restoredCtx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r2.gotoSongs(artist_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const artist_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", (artist_r1 == null ? null : artist_r1.name) || "Unknown", " ");
} }
class ArtistNewListComponent {
    constructor(router, artistService) {
        this.router = router;
        this.artistService = artistService;
    }
    ngOnInit() {
        this.dataSource = new _artist_new_datasource__WEBPACK_IMPORTED_MODULE_0__.ArtistNewDataSource(this.artistService);
    }
    gotoSongs(artist) {
        this.router.navigate(["/song/artist/" + artist.artistId]);
    }
    ngAfterViewInit() {
        this.viewport.setTotalContentSize(20000);
    }
}
ArtistNewListComponent.ɵfac = function ArtistNewListComponent_Factory(t) { return new (t || ArtistNewListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_artist_service__WEBPACK_IMPORTED_MODULE_1__.ArtistService)); };
ArtistNewListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ArtistNewListComponent, selectors: [["app-artist-list"]], viewQuery: function ArtistNewListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__.CdkVirtualScrollViewport, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.viewport = _t.first);
    } }, decls: 3, vars: 2, consts: [[3, "itemSize"], [3, "click", 4, "cdkVirtualFor", "cdkVirtualForOf"], [3, "click"]], template: function ArtistNewListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "cdk-virtual-scroll-viewport", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ArtistNewListComponent_li_2_Template, 2, 1, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("itemSize", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("cdkVirtualForOf", ctx.dataSource);
    } }, directives: [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__.CdkVirtualScrollViewport, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__.CdkFixedSizeVirtualScroll, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__.CdkVirtualForOf], styles: ["cdk-virtual-scroll-viewport[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nli[_ngcontent-%COMP%] {\n  height: 20px;\n  cursor: pointer;\n}\n\nul[_ngcontent-%COMP%] {\n  list-style-type: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGlzdC1uZXctbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtBQUNGIiwiZmlsZSI6ImFydGlzdC1uZXctbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxubGkge1xuICBoZWlnaHQ6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxudWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG59XG4iXX0= */"] });


/***/ }),

/***/ 534:
/*!*************************************************!*\
  !*** ./src/app/artist/artist-new.datasource.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistNewDataSource": () => (/* binding */ ArtistNewDataSource)
/* harmony export */ });
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ 8288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/paging.model */ 8080);



class ArtistNewDataSource extends _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__.DataSource {
    constructor(artistService) {
        super();
        this.artistService = artistService;
        this.dataStream = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]);
    }
    connect() {
        this.artistService.getAllArtists("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_0__.Paging(0, 0, "", "asc"))
            .subscribe((artistCollection) => {
            this.artists = artistCollection.artists;
            this.dataStream.next(this.artists);
        });
        return this.dataStream;
    }
    disconnect() {
    }
}


/***/ }),

/***/ 5359:
/*!*************************************************!*\
  !*** ./src/app/artist/artist-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistRoutingModule": () => (/* binding */ ArtistRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _artist_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./artist-list.component */ 1896);
/* harmony import */ var _artist_new_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./artist-new-list.component */ 2282);
/* harmony import */ var _artist_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./artist-detail.component */ 3794);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);







const artistRoutes = [
    { path: 'artist', component: _artist_list_component__WEBPACK_IMPORTED_MODULE_1__.ArtistListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
    { path: 'artist/:id', component: _artist_detail_component__WEBPACK_IMPORTED_MODULE_3__.ArtistDetailComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
    { path: 'artist-new', component: _artist_new_list_component__WEBPACK_IMPORTED_MODULE_2__.ArtistNewListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class ArtistRoutingModule {
}
ArtistRoutingModule.ɵfac = function ArtistRoutingModule_Factory(t) { return new (t || ArtistRoutingModule)(); };
ArtistRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ArtistRoutingModule });
ArtistRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(artistRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ArtistRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 4824:
/*!*********************************************!*\
  !*** ./src/app/artist/artist.datasource.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistDataSource": () => (/* binding */ ArtistDataSource)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8433);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2489);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3951);
/* harmony import */ var _artist_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artist.model */ 5826);



class ArtistDataSource {
    constructor(artistService) {
        this.artistService = artistService;
        this.artistsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
        this.artistTotalSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(0);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
        this.artists = [];
        this.loading$ = this.loadingSubject.asObservable();
    }
    connect(collectionViewer) {
        return this.artistsSubject.asObservable();
    }
    disconnect(collectionViewer) {
        this.artistsSubject.complete();
        this.artistTotalSubject.complete();
        this.loadingSubject.complete();
    }
    loadArtists(filter, paging) {
        this.loadingSubject.next(true);
        let artistsObservable;
        artistsObservable = this.artistService.getAllArtists(filter, paging);
        artistsObservable
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(new _artist_model__WEBPACK_IMPORTED_MODULE_0__.ArtistCollection([], null, 0))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => this.loadingSubject.next(false)))
            .subscribe(artistCollection => {
            this.artistTotalSubject.next(artistCollection.total);
            this.artistsSubject.next(artistCollection.artists);
            this.artists = artistCollection.artists;
        });
    }
}


/***/ }),

/***/ 5826:
/*!****************************************!*\
  !*** ./src/app/artist/artist.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Artist": () => (/* binding */ Artist),
/* harmony export */   "ArtistCollection": () => (/* binding */ ArtistCollection)
/* harmony export */ });
class Artist {
    constructor(artistId, name, info) {
        this.artistId = artistId;
        this.name = name;
        this.info = info;
    }
}
class ArtistCollection {
    constructor(artists, paging, total) {
        this.artists = artists;
        this.paging = paging;
        this.total = total;
    }
}


/***/ }),

/***/ 7445:
/*!*****************************************!*\
  !*** ./src/app/artist/artist.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistModule": () => (/* binding */ ArtistModule)
/* harmony export */ });
/* harmony import */ var _artist_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artist-list.component */ 1896);
/* harmony import */ var _artist_new_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./artist-new-list.component */ 2282);
/* harmony import */ var _artist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./artist.service */ 7234);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/scrolling */ 9691);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var _artist_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./artist-detail.component */ 3794);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/chips */ 1933);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);



















class ArtistModule {
}
ArtistModule.ɵfac = function ArtistModule_Factory(t) { return new (t || ArtistModule)(); };
ArtistModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ArtistModule });
ArtistModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [
        _artist_service__WEBPACK_IMPORTED_MODULE_2__.ArtistService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChipsModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__.MatPaginatorModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__.MatProgressSpinnerModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSortModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatTableModule,
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__.ScrollingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ArtistModule, { declarations: [_artist_list_component__WEBPACK_IMPORTED_MODULE_0__.ArtistListComponent,
        _artist_new_list_component__WEBPACK_IMPORTED_MODULE_1__.ArtistNewListComponent,
        _artist_detail_component__WEBPACK_IMPORTED_MODULE_3__.ArtistDetailComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChipsModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_14__.MatPaginatorModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__.MatProgressSpinnerModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatTableModule,
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_18__.ScrollingModule], exports: [_artist_list_component__WEBPACK_IMPORTED_MODULE_0__.ArtistListComponent,
        _artist_new_list_component__WEBPACK_IMPORTED_MODULE_1__.ArtistNewListComponent,
        _artist_detail_component__WEBPACK_IMPORTED_MODULE_3__.ArtistDetailComponent] }); })();


/***/ }),

/***/ 7234:
/*!******************************************!*\
  !*** ./src/app/artist/artist.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArtistService": () => (/* binding */ ArtistService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _song_song_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../song/song.service */ 6735);





class ArtistService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService {
    constructor(http, songService) {
        super();
        this.http = http;
        this.songService = songService;
    }
    getAllArtists(filter, paging) {
        let parameter = this.getPagingForUrl(paging);
        if (filter !== null && filter !== undefined && filter !== "") {
            if (parameter === "") {
                parameter = "?filter=" + filter;
            }
            else {
                parameter += "&filter=" + filter;
            }
        }
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist" + parameter);
    }
    getArtist(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist/" + id);
    }
    getArtistInfo(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist/" + id + "/info");
    }
    getAlbumsForArtist(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist/" + id + "/albums");
    }
    artistCoverUrl(artist) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist/" + artist.artistId + "/cover";
    }
}
ArtistService.ɵfac = function ArtistService_Factory(t) { return new (t || ArtistService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_song_song_service__WEBPACK_IMPORTED_MODULE_2__.SongService)); };
ArtistService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ArtistService, factory: ArtistService.ɵfac });


/***/ }),

/***/ 3624:
/*!*************************************************!*\
  !*** ./src/app/config/config-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigRoutingModule": () => (/* binding */ ConfigRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _config_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.component */ 168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const configRoutes = [
    { path: 'config', component: _config_component__WEBPACK_IMPORTED_MODULE_1__.ConfigComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class ConfigRoutingModule {
}
ConfigRoutingModule.ɵfac = function ConfigRoutingModule_Factory(t) { return new (t || ConfigRoutingModule)(); };
ConfigRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ConfigRoutingModule });
ConfigRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(configRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ConfigRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 168:
/*!********************************************!*\
  !*** ./src/app/config/config.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigComponent": () => (/* binding */ ConfigComponent)
/* harmony export */ });
/* harmony import */ var _config_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.model */ 4636);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.service */ 7536);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/divider */ 5152);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 4357);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ 9188);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 8852);













class ConfigComponent {
    constructor(configService, _location) {
        this.configService = configService;
        this._location = _location;
        this.mediaSyncAtStart = false;
    }
    ngOnInit() {
        this.configService.getConfig().subscribe(c => {
            console.log(c);
            this.config = c;
            this.resetFields();
        });
    }
    resetFields() {
        this.databaseType = this.config.database.type;
        this.databaseSchema = this.config.database.schema;
        this.databaseUsername = this.config.database.username;
        this.databasePassword = this.config.database.password;
        this.databaseUrl = this.config.database.url;
        this.mediaPath = this.config.media.path;
        this.mediaSyncFrequency = this.config.media.syncfrequency;
        this.mediaSyncAtStart = this.config.media.syncatstart;
        this.serverPort = this.config.server.port;
        this.applicationMode = this.config.application.mode;
        this.applicationLoglevel = this.config.application.loglevel;
        this.applicationCors = this.config.application.cors;
    }
    cancelClicked() {
        this._location.back();
    }
    saveConfig() {
        let db = new _config_model__WEBPACK_IMPORTED_MODULE_0__.Database(this.databaseUsername, this.databasePassword, this.databaseSchema, this.databaseType, this.databaseUrl);
        let media = new _config_model__WEBPACK_IMPORTED_MODULE_0__.Media(this.mediaPath, this.mediaSyncFrequency, this.mediaSyncAtStart);
        let server = new _config_model__WEBPACK_IMPORTED_MODULE_0__.Server(this.serverPort);
        let application = new _config_model__WEBPACK_IMPORTED_MODULE_0__.Application(this.applicationMode, this.applicationLoglevel, this.applicationCors);
        this.configService.saveConfig(new _config_model__WEBPACK_IMPORTED_MODULE_0__.Config(application, server, db, media)).subscribe(c => {
            this.config = c;
            this.resetFields();
            this.message = "Configuration saved. Restart service to activate.";
        });
    }
}
ConfigComponent.ɵfac = function ConfigComponent_Factory(t) { return new (t || ConfigComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.Location)); };
ConfigComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ConfigComponent, selectors: [["app-config"]], decls: 85, vars: 13, consts: [[1, "config-form"], ["placeholder", "Type", "name", "databasetype", 3, "ngModel", "ngModelChange"], ["value", "mysql"], ["value", "postgres"], ["matInput", "", "placeholder", "Username", "name", "databaseusername", 3, "ngModel", "ngModelChange"], ["type", "password", "matInput", "", "placeholder", "Password", "name", "databasepassword", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Schema", "name", "databaseschema", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Url", "name", "databaseurl", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Path", "name", "mediapath", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Sync frequency", "name", "mediasyncfrequency", 3, "ngModel", "ngModelChange"], ["name", "syncatstart", 3, "ngModel", "ngModelChange"], ["type", "number", "matInput", "", "placeholder", "Port", "name", "serverport", 3, "ngModel", "ngModelChange"], ["placeholder", "Run mode", "name", "applicationmode", 3, "ngModel", "ngModelChange"], ["value", "release"], ["value", "test"], ["value", "debug"], ["placeholder", "Loglevel", "name", "applicationloglevel", 3, "ngModel", "ngModelChange"], ["value", "trace"], ["value", "info"], ["value", "warning"], ["value", "error"], ["value", "fatal"], ["value", "panic"], ["placeholder", "Cors", "name", "applicationcors", 3, "ngModel", "ngModelChange"], ["value", "all"], ["value", "direct"], [1, "message"], ["mat-button", "", 3, "click"]], template: function ConfigComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "go2music Configuration");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Database");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_mat_select_ngModelChange_10_listener($event) { return ctx.databaseType = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "MySQL");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "PostgreSQL");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_16_listener($event) { return ctx.databaseUsername = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_18_listener($event) { return ctx.databasePassword = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_20_listener($event) { return ctx.databaseSchema = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_22_listener($event) { return ctx.databaseUrl = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Media");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_27_listener($event) { return ctx.mediaPath = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_29_listener($event) { return ctx.mediaSyncFrequency = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "mat-checkbox", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_mat_checkbox_ngModelChange_30_listener($event) { return ctx.mediaSyncAtStart = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Sync at start");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Server");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](34, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_input_ngModelChange_36_listener($event) { return ctx.serverPort = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Application");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "mat-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_mat_select_ngModelChange_41_listener($event) { return ctx.applicationMode = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "mat-option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "Production");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "mat-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Test");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "mat-option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Development");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "mat-select", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_mat_select_ngModelChange_49_listener($event) { return ctx.applicationLoglevel = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "mat-option", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51, "Trace");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "mat-option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53, "Debug");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "mat-option", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Info");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "mat-option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](57, "Warning");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "mat-option", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](59, "Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "mat-option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, "Fatal");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "mat-option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](63, "Panic");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](64, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "mat-select", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ConfigComponent_Template_mat_select_ngModelChange_65_listener($event) { return ctx.applicationCors = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "mat-option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](67, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](68, "mat-option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](69, "Direct");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](70, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](71);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](72, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConfigComponent_Template_button_click_73_listener() { return ctx.saveConfig(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75, "done");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](76, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](77, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConfigComponent_Template_button_click_77_listener() { return ctx.resetFields(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](79, "undo");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](80, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](81, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ConfigComponent_Template_button_click_81_listener() { return ctx.cancelClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](84, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.databaseType);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.databaseUsername);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.databasePassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.databaseSchema);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.databaseUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.mediaPath);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.mediaSyncFrequency);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.mediaSyncAtStart);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.serverPort);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.applicationMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.applicationLoglevel);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.applicationCors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.message);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardContent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm, _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__.MatDivider, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatOption, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NumberValueAccessor, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardActions, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon], styles: [".config-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.config-form[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.message[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7QUFDRiIsImZpbGUiOiJjb25maWcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29uZmlnLWZvcm0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uY29uZmlnLWZvcm0+ICoge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm1lc3NhZ2Uge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 4636:
/*!****************************************!*\
  !*** ./src/app/config/config.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Server": () => (/* binding */ Server),
/* harmony export */   "Database": () => (/* binding */ Database),
/* harmony export */   "Media": () => (/* binding */ Media),
/* harmony export */   "Application": () => (/* binding */ Application),
/* harmony export */   "Config": () => (/* binding */ Config)
/* harmony export */ });
class Server {
    constructor(port) {
        this.port = port;
    }
}
class Database {
    constructor(username, password, schema, type, url) {
        this.username = username;
        this.password = password;
        this.schema = schema;
        this.type = type;
        this.url = url;
    }
}
class Media {
    constructor(path, syncfrequency, syncatstart) {
        this.path = path;
        this.syncfrequency = syncfrequency;
        this.syncatstart = syncatstart;
    }
}
class Application {
    constructor(mode, loglevel, cors) {
        this.mode = mode;
        this.loglevel = loglevel;
        this.cors = cors;
    }
}
class Config {
    constructor(application, server, database, media) {
        this.application = application;
        this.server = server;
        this.database = database;
        this.media = media;
    }
}


/***/ }),

/***/ 6550:
/*!*****************************************!*\
  !*** ./src/app/config/config.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigModule": () => (/* binding */ ConfigModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _config_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.component */ 168);
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.service */ 7536);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ 9188);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/divider */ 5152);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);













class ConfigModule {
}
ConfigModule.ɵfac = function ConfigModule_Factory(t) { return new (t || ConfigModule)(); };
ConfigModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ConfigModule });
ConfigModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule,
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__.MatDividerModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelectModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ConfigModule, { declarations: [_config_component__WEBPACK_IMPORTED_MODULE_0__.ConfigComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_8__.MatDividerModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelectModule], exports: [_config_component__WEBPACK_IMPORTED_MODULE_0__.ConfigComponent] }); })();


/***/ }),

/***/ 7536:
/*!******************************************!*\
  !*** ./src/app/config/config.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigService": () => (/* binding */ ConfigService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);



class ConfigService {
    constructor(http) {
        this.http = http;
    }
    getConfig() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/config");
    }
    saveConfig(config) {
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/config", config);
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
ConfigService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac });


/***/ }),

/***/ 2041:
/*!***********************************************!*\
  !*** ./src/app/genre/genre-list.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenreListComponent": () => (/* binding */ GenreListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _genre_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./genre.service */ 4133);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);





function GenreListComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function GenreListComponent_a_2_Template_a_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const genre_r1 = restoredCtx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.gotoSongs(genre_r1.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const genre_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", genre_r1.name, " (", genre_r1.count, " songs)");
} }
class GenreListComponent {
    constructor(router, genreService) {
        this.router = router;
        this.genreService = genreService;
    }
    ngOnInit() {
        this.genreService.getGenres().subscribe(genres => this.genres = genres);
    }
    gotoSongs(genre) {
        this.router.navigate(["/song/genre/" + genre]);
    }
}
GenreListComponent.ɵfac = function GenreListComponent_Factory(t) { return new (t || GenreListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_genre_service__WEBPACK_IMPORTED_MODULE_0__.GenreService)); };
GenreListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GenreListComponent, selectors: [["app-genre-list"]], decls: 3, vars: 1, consts: [[1, "decades"], ["mat-list-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "click"]], template: function GenreListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, GenreListComponent_a_2_Template, 2, 2, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.genres);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatList, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItem], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnZW5yZS1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 430:
/*!***********************************************!*\
  !*** ./src/app/genre/genre-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenreRoutingModule": () => (/* binding */ GenreRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _genre_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./genre-list.component */ 2041);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const genreRoutes = [
    { path: 'genre', component: _genre_list_component__WEBPACK_IMPORTED_MODULE_1__.GenreListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class GenreRoutingModule {
}
GenreRoutingModule.ɵfac = function GenreRoutingModule_Factory(t) { return new (t || GenreRoutingModule)(); };
GenreRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: GenreRoutingModule });
GenreRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(genreRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](GenreRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 971:
/*!***************************************!*\
  !*** ./src/app/genre/genre.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenreModule": () => (/* binding */ GenreModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _genre_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./genre-list.component */ 2041);
/* harmony import */ var _genre_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./genre.service */ 4133);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ 1382);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);






class GenreModule {
}
GenreModule.ɵfac = function GenreModule_Factory(t) { return new (t || GenreModule)(); };
GenreModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: GenreModule });
GenreModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [
        _genre_service__WEBPACK_IMPORTED_MODULE_1__.GenreService
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](GenreModule, { declarations: [_genre_list_component__WEBPACK_IMPORTED_MODULE_0__.GenreListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_5__.MatListModule], exports: [_genre_list_component__WEBPACK_IMPORTED_MODULE_0__.GenreListComponent] }); })();


/***/ }),

/***/ 4133:
/*!****************************************!*\
  !*** ./src/app/genre/genre.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenreService": () => (/* binding */ GenreService)
/* harmony export */ });
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 3981);




class GenreService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
    constructor(http) {
        super();
        this.http = http;
    }
    getGenres() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.restserver + "/api/info/genres");
    }
}
GenreService.ɵfac = function GenreService_Factory(t) { return new (t || GenreService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
GenreService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: GenreService, factory: GenreService.ɵfac });


/***/ }),

/***/ 6146:
/*!*********************************************************!*\
  !*** ./src/app/management/management-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagementRoutingModule": () => (/* binding */ ManagementRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _management_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./management.component */ 7941);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const managementRoutes = [
    { path: 'management', component: _management_component__WEBPACK_IMPORTED_MODULE_1__.ManagementComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
];
class ManagementRoutingModule {
}
ManagementRoutingModule.ɵfac = function ManagementRoutingModule_Factory(t) { return new (t || ManagementRoutingModule)(); };
ManagementRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ManagementRoutingModule });
ManagementRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(managementRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ManagementRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 7941:
/*!****************************************************!*\
  !*** ./src/app/management/management.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagementComponent": () => (/* binding */ ManagementComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _management_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./management.service */ 9549);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 4996);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/expansion */ 5082);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 4357);









function ManagementComponent_mat_list_item_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", entry_r5.key, " - ", entry_r5.value, "");
} }
function ManagementComponent_mat_list_item_13_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManagementComponent_mat_list_item_13_Template_mat_icon_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const entry_r6 = restoredCtx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.removeDanglingSong(entry_r6.key); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](entry_r6.value);
} }
function ManagementComponent_mat_list_item_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](entry_r9.value);
} }
function ManagementComponent_mat_list_item_41_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManagementComponent_mat_list_item_41_Template_mat_icon_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12); const entry_r10 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r11.renameAlbum(entry_r10.key); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "build");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](entry_r10.value);
} }
function ManagementComponent_mat_list_item_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const entry_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](entry_r13.key);
} }
class ManagementComponent {
    constructor(managementService, snackBar) {
        this.managementService = managementService;
        this.snackBar = snackBar;
    }
    ngOnInit() {
        this.managementService.getSync().subscribe(s => this.sync = s);
    }
    removeDanglingSong(id) {
        console.log("Remove song " + id);
        this.managementService.removeDanglingSong(id).subscribe(s => {
            this.sync = s;
            this.openSnackBar(`Removed dangling song`, "Show");
        });
    }
    removeAllDanglingSongs() {
        console.log("Remove all dangling songs");
        this.managementService.deleteSync().subscribe(s => {
            this.sync = s;
            this.openSnackBar(`Removed all dangling songs`, "Show");
        });
    }
    removeAllEmptyAlbums() {
        console.log("Remove all empty albums");
        this.managementService.removeEmptyAlbums().subscribe(s => {
            this.sync = s;
            this.openSnackBar(`Removed all empty albums`, "Show");
        });
    }
    startSync() {
        this.managementService.startSync().subscribe(s => {
            this.sync = s;
            this.openSnackBar(`Syncronize started`, "Show");
        });
    }
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
    emptyAlbumsCount() {
        if (this.isNullOrUndefined(this.sync) || this.isNullOrUndefined(this.sync.empty_albums)) {
            return 0;
        }
        return Object.keys(this.sync.empty_albums).length;
    }
    albumsWithoutTitleCount() {
        if (this.isNullOrUndefined(this.sync) || this.isNullOrUndefined(this.sync.albums_without_title)) {
            return 0;
        }
        return Object.keys(this.sync.albums_without_title).length;
    }
    artistsWithoutNameCount() {
        if (this.isNullOrUndefined(this.sync) || this.isNullOrUndefined(this.sync.artists_without_name)) {
            return 0;
        }
        return Object.keys(this.sync.artists_without_name).length;
    }
    renameAlbum(id) {
        console.log("Rename album " + id);
        this.managementService.renameAlbum(id).subscribe(s => {
            this.sync = s;
            this.openSnackBar(`Album renamed`, "Show");
        });
    }
    isNullOrUndefined(o) {
        return o === null || o === undefined;
    }
}
ManagementComponent.ɵfac = function ManagementComponent_Factory(t) { return new (t || ManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_management_service__WEBPACK_IMPORTED_MODULE_0__.ManagementService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar)); };
ManagementComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ManagementComponent, selectors: [["app-management"]], decls: 50, vars: 21, consts: [[3, "multi"], [4, "ngFor", "ngForOf"], ["mat-button", "", 3, "click"], ["mat-list-icon", "", 3, "click"], ["mat-line", ""]], template: function ManagementComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-accordion", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ManagementComponent_mat_list_item_6_Template, 4, 2, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, ManagementComponent_mat_list_item_13_Template, 6, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-action-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManagementComponent_Template_button_click_16_listener() { return ctx.removeAllDanglingSongs(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " Remove all ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManagementComponent_Template_button_click_20_listener() { return ctx.startSync(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "sync");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, " Syncronize now ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, ManagementComponent_mat_list_item_29_Template, 4, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](30, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "mat-action-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManagementComponent_Template_button_click_32_listener() { return ctx.removeAllEmptyAlbums(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, " Remove all ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, ManagementComponent_mat_list_item_41_Template, 6, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](42, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "mat-expansion-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "mat-expansion-panel-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](48, ManagementComponent_mat_list_item_48_Template, 4, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](49, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("multi", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Songfiles with problems while importing (", ctx.sync == null ? null : ctx.sync.new_songs_problems, ") ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 11, ctx.sync == null ? null : ctx.sync.problem_songs));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Songs not found in filesystem (", ctx.sync == null ? null : ctx.sync.dangling_songs_found, ") ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](14, 13, ctx.sync == null ? null : ctx.sync.dangling_songs));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Albums without any song (", ctx.emptyAlbumsCount(), ") ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](30, 15, ctx.sync == null ? null : ctx.sync.empty_albums));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Albums without title (", ctx.albumsWithoutTitleCount(), ") ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](42, 17, ctx.sync == null ? null : ctx.sync.albums_without_title));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Artists without name (", ctx.artistsWithoutNameCount(), ") ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](49, 19, ctx.sync == null ? null : ctx.sync.artists_without_name));
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanelTitle, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatList, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_3__.MatExpansionPanelActionRow, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatListItem, _angular_material_list__WEBPACK_IMPORTED_MODULE_4__.MatListIconCssMatStyler, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatLine], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.KeyValuePipe], styles: ["mat-list-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  height: 1.25em !important;\n}\n\n[_nghost-%COMP%]     .mat-list-item-content {\n  padding: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHFCQUFBO0FBQ0YiLCJmaWxlIjoibWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1saXN0LWl0ZW0ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMS4yNWVtIWltcG9ydGFudDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICBwYWRkaW5nOiAwIWltcG9ydGFudDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 8409:
/*!*************************************************!*\
  !*** ./src/app/management/management.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagementModule": () => (/* binding */ ManagementModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _management_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./management.component */ 7941);
/* harmony import */ var _management_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./management.service */ 9549);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ 5082);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 4996);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);










class ManagementModule {
}
ManagementModule.ɵfac = function ManagementModule_Factory(t) { return new (t || ManagementModule)(); };
ManagementModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ManagementModule });
ManagementModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [
        _management_service__WEBPACK_IMPORTED_MODULE_1__.ManagementService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule,
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBarModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ManagementModule, { declarations: [_management_component__WEBPACK_IMPORTED_MODULE_0__.ManagementComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__.MatExpansionModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBarModule], exports: [_management_component__WEBPACK_IMPORTED_MODULE_0__.ManagementComponent] }); })();


/***/ }),

/***/ 9549:
/*!**************************************************!*\
  !*** ./src/app/management/management.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManagementService": () => (/* binding */ ManagementService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);



class ManagementService {
    constructor(http) {
        this.http = http;
    }
    getSync() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync");
    }
    startSync() {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync", null);
    }
    deleteSync() {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync/dangling");
    }
    removeDanglingSong(id) {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync/dangling/" + id);
    }
    removeEmptyAlbums() {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync/emptyalbums");
    }
    renameAlbum(id) {
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync/album/" + id, null);
    }
}
ManagementService.ɵfac = function ManagementService_Factory(t) { return new (t || ManagementService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
ManagementService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ManagementService, factory: ManagementService.ɵfac });


/***/ }),

/***/ 7710:
/*!*****************************************************!*\
  !*** ./src/app/overview/overview-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewRoutingModule": () => (/* binding */ OverviewRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _overview_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overview.component */ 3629);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const overviewRoutes = [
    { path: 'overview', component: _overview_component__WEBPACK_IMPORTED_MODULE_1__.OverviewComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
];
class OverviewRoutingModule {
}
OverviewRoutingModule.ɵfac = function OverviewRoutingModule_Factory(t) { return new (t || OverviewRoutingModule)(); };
OverviewRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: OverviewRoutingModule });
OverviewRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(overviewRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](OverviewRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 3629:
/*!************************************************!*\
  !*** ./src/app/overview/overview.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewComponent": () => (/* binding */ OverviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _overview_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overview.service */ 2632);
/* harmony import */ var _player_player_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player/player.service */ 7143);
/* harmony import */ var _album_album_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../album/album.service */ 3283);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../security/auth.service */ 7829);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/grid-list */ 5409);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 4357);
/* harmony import */ var _shared_duration_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/duration.pipe */ 1616);
/* harmony import */ var _shared_unixdate_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/unixdate.pipe */ 9161);













function OverviewComponent_mat_list_item_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OverviewComponent_mat_list_item_8_Template_mat_list_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7); const song_r5 = restoredCtx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r6.playSong(song_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r5 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r0.coverUrlForSong(song_r5), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r5.artist == null ? null : song_r5.artist.name);
} }
function OverviewComponent_mat_list_item_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OverviewComponent_mat_list_item_16_Template_mat_list_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10); const album_r8 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r9.goto("/song/album/" + album_r8.albumId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const album_r8 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r1.coverUrlForAlbum(album_r8), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](album_r8.title);
} }
function OverviewComponent_mat_list_item_24_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OverviewComponent_mat_list_item_24_Template_mat_list_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13); const song_r11 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r12.playSong(song_r11); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r11 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r2.coverUrlForSong(song_r11), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r11.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r11.artist == null ? null : song_r11.artist.name);
} }
function OverviewComponent_mat_list_item_32_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-list-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function OverviewComponent_mat_list_item_32_Template_mat_list_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16); const song_r14 = restoredCtx.$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r15.playSong(song_r14); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "0");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r14 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r3.coverUrlForSong(song_r14), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r14.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](song_r14.artist == null ? null : song_r14.artist.name);
} }
function OverviewComponent_mat_grid_tile_72_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-grid-tile");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Sync state");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "mat-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-list", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Sync state");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Last sync");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](18, "unixdate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "Last sync duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](24, "duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "Songs found");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, "Songs added");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, "Not added");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "mat-list-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42, "Dangling songs");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.sync == null ? null : ctx_r4.sync.state);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](17, 7, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](18, 10, (ctx_r4.sync == null ? null : ctx_r4.sync.last_sync_started) * 1000), "short"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](24, 12, ctx_r4.sync == null ? null : ctx_r4.sync.last_sync_duration));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.sync == null ? null : ctx_r4.sync.songs_found);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.sync == null ? null : ctx_r4.sync.new_songs_added);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.sync == null ? null : ctx_r4.sync.new_songs_problems);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.sync == null ? null : ctx_r4.sync.dangling_songs_found);
} }
class OverviewComponent {
    constructor(overviewService, playerService, albumService, router, authService) {
        this.overviewService = overviewService;
        this.playerService = playerService;
        this.albumService = albumService;
        this.router = router;
        this.authService = authService;
    }
    ngOnInit() {
        this.overviewService.getInfo().subscribe(info => {
            this.info = info;
        });
        this.overviewService.getSync().subscribe(sync => {
            this.sync = sync;
        });
    }
    goto(url) {
        this.router.navigate([url]);
    }
    playSong(song) {
        this.playerService.addAndPlaySong(song);
    }
    isAdmin() {
        return this.authService.isAdmin();
    }
    coverUrlForSong(song) {
        return this.playerService.songCoverUrl(song);
    }
    coverUrlForAlbum(album) {
        return this.albumService.albumCoverUrl(album);
    }
}
OverviewComponent.ɵfac = function OverviewComponent_Factory(t) { return new (t || OverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_overview_service__WEBPACK_IMPORTED_MODULE_0__.OverviewService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_player_player_service__WEBPACK_IMPORTED_MODULE_1__.PlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_album_album_service__WEBPACK_IMPORTED_MODULE_2__.AlbumService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_security_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService)); };
OverviewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: OverviewComponent, selectors: [["app-info"]], decls: 73, vars: 13, consts: [["cols", "2", "rowHeight", "2:1"], ["dense", ""], ["class", "multi", 3, "click", 4, "ngFor", "ngForOf"], [1, "single"], ["mat-line", ""], [4, "ngIf"], [1, "multi", 3, "click"], ["matListAvatar", "", 3, "src"]], template: function OverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-grid-list", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Recently added songs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, OverviewComponent_mat_list_item_8_Template, 7, 3, "mat-list-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Recently added albums");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "mat-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, OverviewComponent_mat_list_item_16_Template, 4, 2, "mat-list-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "Recently played songs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "mat-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, OverviewComponent_mat_list_item_24_Template, 7, 3, "mat-list-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29, "Most played songs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "mat-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](32, OverviewComponent_mat_list_item_32_Template, 9, 3, "mat-list-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "mat-grid-tile");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, "Statistics");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "mat-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42, "Songs in library");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](45, "duration");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](47, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48, "Albums in library");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](50);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](51, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](52, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](53, "Artists in library");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](54, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](55);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](56, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](57, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](58, "Playlists in library");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](59, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](60);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](61, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](62, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](63, "Users");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](64, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](65);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](66, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](67, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](68, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](69, "mat-list-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](70, "p", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](71, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](72, OverviewComponent_mat_grid_tile_72_Template, 45, 14, "mat-grid-tile", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.info == null ? null : ctx.info.songsRecentlyAdded);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.info == null ? null : ctx.info.albumsRecentlyAdded);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.info == null ? null : ctx.info.songsRecentlyPlayed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.info == null ? null : ctx.info.songsMostPlayed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", ctx.info == null ? null : ctx.info.songCount, " (", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](45, 11, ctx.info == null ? null : ctx.info.totalLength), " total)");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.albumCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.artistCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.playlistCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.info == null ? null : ctx.info.userCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isAdmin());
    } }, directives: [_angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__.MatGridList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__.MatGridTile, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardContent, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatList, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatListItem, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatLine, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatListAvatarCssMatStyler], pipes: [_shared_duration_pipe__WEBPACK_IMPORTED_MODULE_4__.DurationPipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe, _shared_unixdate_pipe__WEBPACK_IMPORTED_MODULE_5__.UnixdatePipe], styles: ["mat-card[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 5px 5px 5px 5px;\n}\n\nmat-list-item.multi[_ngcontent-%COMP%] {\n  cursor: pointer;\n  height: 2.75em !important;\n}\n\nmat-list-item.single[_ngcontent-%COMP%] {\n  cursor: pointer;\n  height: 1.25em !important;\n}\n\np.mat-line[_ngcontent-%COMP%] {\n  width: 60%;\n}\n\n[_nghost-%COMP%]   [_ngcontent-%COMP%]::ng-eep   .mat-list-item-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm92ZXJ2aWV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EseUJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7QUFDRiIsImZpbGUiOiJvdmVydmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogNXB4IDVweCA1cHggNXB4O1xufVxuXG5tYXQtbGlzdC1pdGVtLm11bHRpIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDIuNzVlbSFpbXBvcnRhbnQ7XG59XG5cbm1hdC1saXN0LWl0ZW0uc2luZ2xlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDEuMjVlbSFpbXBvcnRhbnQ7XG59XG5cbnAubWF0LWxpbmUge1xuICB3aWR0aDogNjAlO1xufVxuXG46aG9zdCA6Om5nLWVlcCAubWF0LWxpc3QtaXRlbS1jb250ZW50IHtcbiAgcGFkZGluZzogMCFpbXBvcnRhbnQ7XG59XG4iXX0= */"] });


/***/ }),

/***/ 393:
/*!*********************************************!*\
  !*** ./src/app/overview/overview.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewModule": () => (/* binding */ OverviewModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/shared.module */ 1382);
/* harmony import */ var _overview_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overview.component */ 3629);
/* harmony import */ var _overview_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overview.service */ 2632);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/grid-list */ 5409);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);










class OverviewModule {
}
OverviewModule.ɵfac = function OverviewModule_Factory(t) { return new (t || OverviewModule)(); };
OverviewModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: OverviewModule });
OverviewModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [
        _overview_service__WEBPACK_IMPORTED_MODULE_2__.OverviewService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule,
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__.MatGridListModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](OverviewModule, { declarations: [_overview_component__WEBPACK_IMPORTED_MODULE_1__.OverviewComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_8__.MatGridListModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListModule], exports: [_overview_component__WEBPACK_IMPORTED_MODULE_1__.OverviewComponent] }); })();


/***/ }),

/***/ 2632:
/*!**********************************************!*\
  !*** ./src/app/overview/overview.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewService": () => (/* binding */ OverviewService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);



class OverviewService {
    constructor(http) {
        this.http = http;
    }
    getInfo() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/info");
    }
    getSync() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/sync");
    }
}
OverviewService.ɵfac = function OverviewService_Factory(t) { return new (t || OverviewService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
OverviewService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OverviewService, factory: OverviewService.ɵfac });


/***/ }),

/***/ 2568:
/*!************************************************!*\
  !*** ./src/app/player/play-queue.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayQueueComponent": () => (/* binding */ PlayQueueComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _player_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.service */ 7143);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 4744);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 4357);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _shared_duration_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/duration.pipe */ 1616);










const _c0 = function (a0, a1) { return { "index": a0, "song": a1 }; };
function PlayQueueComponent_mat_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_mat_list_item_1_Template_mat_icon_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const song_r3 = restoredCtx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.playSong(song_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_mat_list_item_1_Template_p_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const song_r3 = restoredCtx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r7.playSong(song_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_mat_list_item_1_Template_p_click_5_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const song_r3 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.playSong(song_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "small", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_mat_list_item_1_Template_small_click_9_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const song_r3 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r9.playSong(song_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "more_vert");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.isCurrentSong(song_r3) ? "play_arrow" : "queue_music");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](song_r3.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", song_r3.artist == null ? null : song_r3.artist.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 6, song_r3.duration));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r1)("matMenuTriggerData", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](8, _c0, i_r4, song_r3));
} }
function PlayQueueComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_ng_template_4_Template_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const index_r10 = restoredCtx.index; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.playIndex(index_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlayQueueComponent_ng_template_4_Template_button_click_5_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const index_r10 = restoredCtx.index; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r13.deleteIndex(index_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class PlayQueueComponent {
    constructor(playerService) {
        this.playerService = playerService;
    }
    ngOnInit() {
        this.songListSubscription = this.playerService.listchange$.subscribe(songs => {
            this.songs = songs;
        });
        this.playerService.loadPlayqueue();
    }
    ngOnDestroy() {
        this.songListSubscription.unsubscribe();
    }
    playSong(song) {
        this.playerService.playSong(song);
    }
    isCurrentSong(song) {
        return this.playerService.currentSong === song;
    }
    playIndex(i) {
        this.playerService.playSongByIndex(i);
    }
    deleteIndex(i) {
        this.playerService.removeSongByIndex(i);
    }
}
PlayQueueComponent.ɵfac = function PlayQueueComponent_Factory(t) { return new (t || PlayQueueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_player_service__WEBPACK_IMPORTED_MODULE_0__.PlayerService)); };
PlayQueueComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PlayQueueComponent, selectors: [["app-play-queue"]], decls: 5, vars: 1, consts: [["dense", "", "cdkDrop", ""], ["cdkDrag", "", 4, "ngFor", "ngForOf"], ["menu", "matMenu"], ["matMenuContent", ""], ["cdkDrag", ""], ["mat-list-icon", "", 3, "click"], ["mat-line", "", 3, "click"], [3, "click"], ["mat-icon-button", "", 3, "matMenuTriggerFor", "matMenuTriggerData"], ["mat-menu-item", "", 3, "click"]], template: function PlayQueueComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PlayQueueComponent_mat_list_item_1_Template, 15, 11, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-menu", null, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PlayQueueComponent_ng_template_4_Template, 10, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.songs);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatList, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuContent, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListItem, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_6__.CdkDrag, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListIconCssMatStyler, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatLine, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuItem], pipes: [_shared_duration_pipe__WEBPACK_IMPORTED_MODULE_1__.DurationPipe], styles: ["mat-list-item[_ngcontent-%COMP%] {\n  cursor: pointer;\n  height: 3em !important;\n}\n\n[_nghost-%COMP%]     .mat-list-item-content {\n  padding: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXktcXVldWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFFQTtFQUNFLHFCQUFBO0FBQ0YiLCJmaWxlIjoicGxheS1xdWV1ZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1saXN0LWl0ZW0ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogM2VtIWltcG9ydGFudDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICBwYWRkaW5nOiAwIWltcG9ydGFudDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 9087:
/*!********************************************!*\
  !*** ./src/app/player/player.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerComponent": () => (/* binding */ PlayerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! howler */ 6712);
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(howler__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _player_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.dialog */ 5942);
/* harmony import */ var _shared_textinput_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/textinput-dialog.component */ 6978);
/* harmony import */ var _shared_yesno_alert_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/yesno-alert.component */ 4922);
/* harmony import */ var _player_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.service */ 7143);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ 4996);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout/flex */ 8669);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ 3776);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/flex-layout/extended */ 3479);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/slider */ 5291);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 4731);
/* harmony import */ var _play_queue_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./play-queue.component */ 2568);
/* harmony import */ var _shared_duration_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/duration.pipe */ 1616);




















const _c0 = ["volumeCtrl"];
const _c1 = function (a0) { return { "active": a0 }; };
class PlayerComponent {
    constructor(playerService, snackBar, dialog) {
        this.playerService = playerService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.volume = 100;
        this.position = 0;
        this.progress = 0;
        this.hoverPosition = 0;
        this.newSongLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
    }
    ngOnInit() {
        this.songPlaySubscription = this.playerService.play$.subscribe(song => {
            this.playSong(song);
            this.openSnackBar(`Now playing ${song.title} from ${song.artist.name}`, "Show");
        });
    }
    ngAfterViewInit() {
        this.volumeControl.input.subscribe(event => {
            this.volumeChanged(event.value);
        });
    }
    ngOnDestroy() {
        this.songPlaySubscription.unsubscribe();
        this.volumeControl.input.unsubscribe();
    }
    isCurrentSong(song) {
        return this.playerService.currentSong === song;
    }
    playerReady() {
        return !this.isNullOrUndefined(this.audio);
    }
    play() {
        this.audio.play();
    }
    pause() {
        if (this.audio.playing()) {
            this.audio.pause();
        }
        else {
            this.audio.play();
        }
    }
    stop() {
        this.audio.stop();
        this.playerService.currentSong = null;
    }
    next() {
        this.playerService.nextSong();
    }
    previous() {
        this.playerService.previousSong();
    }
    openFullscreen() {
        let dialogRef = this.dialog.open(_player_dialog__WEBPACK_IMPORTED_MODULE_1__.PlayerDialog, {
            width: '100vh',
            height: '100vh',
            maxWidth: '100vh',
            maxHeight: '100vh',
            hasBackdrop: false
        });
    }
    cover() {
        if (this.playerService.currentSong === null || this.playerService.currentSong === undefined) {
            return "../assets/img/defaultAlbum.png";
        }
        return this.playerService.songCoverUrl(this.playerService.currentSong);
    }
    volumeChanged(volume) {
        this.volume = volume;
        if (!this.isNullOrUndefined(this.audio)) {
            this.audio.volume(this.volume / 100);
        }
    }
    canPlay() {
        return !this.isNullOrUndefined(this.playerService.currentSong);
    }
    isPlaying() {
        return !this.isNullOrUndefined(this.audio) && this.audio.playing();
    }
    isPaused() {
        return !this.isNullOrUndefined(this.audio) && !this.audio.playing() && this.position !== 0;
    }
    playSong(song) {
        this.playerService.currentSong = song;
        if (!this.isNullOrUndefined(this.audio)) {
            this.audio.unload();
        }
        this.audio = new howler__WEBPACK_IMPORTED_MODULE_0__.Howl({
            src: this.playerService.songStreamUrl(song),
            format: ["mp3"],
            volume: this.volume / 100,
            onend: soundId => this.next()
        });
        this.audio.play();
        setInterval(() => {
            const pos = this.audio.seek();
            this.position = (pos instanceof howler__WEBPACK_IMPORTED_MODULE_0__.Howl) ? 0 : Math.round(pos);
            this.progress = (pos instanceof howler__WEBPACK_IMPORTED_MODULE_0__.Howl) ? 0 : Math.round(pos * 100.0 / this.audio.duration());
        }, 1000);
        this.audio.on('load', (id) => {
            this.newSongLoaded.emit(song);
        });
    }
    seek(event) {
        const newPosition = this.calculateSongPosition(event.offsetX, event.srcElement.clientWidth.toFixed(0));
        this.audio.seek(newPosition);
    }
    setHoverPosition(event) {
        this.hoverPosition = this.calculateSongPosition(event.offsetX, event.srcElement.clientWidth.toFixed(0));
    }
    currentSong() {
        return this.playerService.currentSong;
    }
    createPlaylist() {
        const dialogRef = this.dialog.open(_shared_textinput_dialog_component__WEBPACK_IMPORTED_MODULE_2__.TextinputDialogComponent, {
            width: '400px',
            data: { title: "Create playlist from queue", prompt: "Enter playlist name", input: "" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!this.isNullOrUndefined(result) && result != "") {
                this.playerService.createPlaylist(result);
            }
        });
    }
    clearQueue() {
        const dialogRef = this.dialog.open(_shared_yesno_alert_component__WEBPACK_IMPORTED_MODULE_3__.YesnoAlertComponent, {
            width: '400px',
            data: { title: "Empty play queue", prompt: "Are you sure?" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.playerService.clearQueue();
            }
        });
    }
    calculateSongPosition(position, size) {
        if (this.canPlay()) {
            return Math.round(this.playerService.currentSong.duration * position / size);
        }
        return 0;
    }
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
    isNullOrUndefined(o) {
        return o === null || o === undefined;
    }
}
PlayerComponent.ɵfac = function PlayerComponent_Factory(t) { return new (t || PlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_player_service__WEBPACK_IMPORTED_MODULE_4__.PlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialog)); };
PlayerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlayerComponent, selectors: [["app-player"]], viewQuery: function PlayerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.volumeControl = _t.first);
    } }, outputs: { newSongLoaded: "newSongLoaded" }, decls: 48, vars: 19, consts: [["fxLayout", "column", "fxLayoutAlign", "start", "fxLauoutGap", "10px"], ["id", "player"], [1, "player"], ["mat-card-image", "", "width", "100%", 3, "src"], ["mode", "determinate", 3, "value", "click", "mouseover"], [1, "text-center"], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", "", 3, "disabled", "color", "ngClass", "click"], ["mat-icon-button", "", 3, "ngClass", "click"], ["color", "primary", "min", "0", "max", "100", "step", "1", 3, "value"], ["volumeCtrl", ""], ["mat-icon-button", "", "matTooltip", "Create playlist from play queue", 3, "click"], ["mat-icon-button", "", "matTooltip", "Empty play queue", 3, "click"], ["id", "play-queue"]], template: function PlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-card", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-card-subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "mat-progress-bar", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_mat_progress_bar_click_10_listener($event) { return ctx.seek($event); })("mouseover", function PlayerComponent_Template_mat_progress_bar_mouseover_10_listener($event) { return ctx.setHoverPosition($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](14, "duration");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "duration");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_17_listener() { return ctx.previous(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "fast_rewind");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_20_listener() { return ctx.play(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22, "play_arrow");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_23_listener() { return ctx.pause(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25, "pause");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_26_listener() { return ctx.stop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](28, "stop");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](29, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_29_listener() { return ctx.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](31, "fast_forward");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_32_listener() { return ctx.volumeChanged(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](34, "volume_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](35, "mat-slider", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_37_listener() { return ctx.volumeChanged(100); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](38, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](39, "volume_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](40, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_40_listener() { return ctx.createPlaylist(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](42, "create");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function PlayerComponent_Template_button_click_43_listener() { return ctx.clearQueue(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](44, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](45, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](46, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](47, "app-play-queue");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        let tmp_4_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"]((tmp_0_0 = ctx.currentSong()) == null ? null : tmp_0_0.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"]((tmp_1_0 = ctx.currentSong()) == null ? null : tmp_1_0.artist == null ? null : tmp_1_0.artist.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("src", ctx.cover(), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.progress);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](14, 11, ctx.position), " / ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 13, (tmp_4_0 = ctx.currentSong()) == null ? null : tmp_4_0.duration), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !ctx.canPlay())("color", ctx.isPlaying() ? "accent" : "basic")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](15, _c1, ctx.isPlaying()));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](17, _c1, ctx.isPaused()));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.volume);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_10__.DefaultLayoutAlignDirective, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardImage, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardContent, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__.MatProgressBar, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_16__.DefaultClassDirective, _angular_material_slider__WEBPACK_IMPORTED_MODULE_17__.MatSlider, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltip, _play_queue_component__WEBPACK_IMPORTED_MODULE_5__.PlayQueueComponent], pipes: [_shared_duration_pipe__WEBPACK_IMPORTED_MODULE_6__.DurationPipe], styles: ["img[_ngcontent-%COMP%] {\n  width: 300px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRiIsImZpbGUiOiJwbGF5ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbWcge1xuICB3aWR0aDogMzAwcHg7XG59XG4iXX0= */"] });


/***/ }),

/***/ 5942:
/*!*****************************************!*\
  !*** ./src/app/player/player.dialog.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerDialog": () => (/* binding */ PlayerDialog)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);



class PlayerDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onCloseClicked() {
        this.dialogRef.close();
    }
}
PlayerDialog.ɵfac = function PlayerDialog_Factory(t) { return new (t || PlayerDialog)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA)); };
PlayerDialog.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayerDialog, selectors: [["player-dialog"]], decls: 5, vars: 0, consts: [["mat-button", "", "mat-dialog-close", "", 1, "close-button", 3, "click"], ["mat-dialog-content", ""]], template: function PlayerDialog_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlayerDialog_Template_button_click_0_listener() { return ctx.onCloseClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-player");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".close-button[_ngcontent-%COMP%] {\n  cursor: pointer;\n  float: right;\n  marginTop: 5px;\n  width: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci5kaWFsb2cuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDRiIsImZpbGUiOiJwbGF5ZXIuZGlhbG9nLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xvc2UtYnV0dG9uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbG9hdDogcmlnaHQ7XG4gIG1hcmdpblRvcDogNXB4O1xuICB3aWR0aDogMjBweDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 5070:
/*!*****************************************!*\
  !*** ./src/app/player/player.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerModule": () => (/* binding */ PlayerModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _player_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.component */ 9087);
/* harmony import */ var _player_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.service */ 7143);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ 1382);
/* harmony import */ var _play_queue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./play-queue.component */ 2568);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 4744);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ 8001);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/divider */ 5152);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-bar */ 3776);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/slider */ 5291);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/snack-bar */ 4996);
/* harmony import */ var _player_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.dialog */ 5942);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 4731);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);





















class PlayerModule {
}
PlayerModule.ɵfac = function PlayerModule_Factory(t) { return new (t || PlayerModule)(); };
PlayerModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: PlayerModule });
PlayerModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [
        _player_service__WEBPACK_IMPORTED_MODULE_1__.PlayerService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
            _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__.DragDropModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__.FlexLayoutModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCardModule,
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_11__.MatDividerModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_13__.MatListModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuModule,
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__.MatProgressBarModule,
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_16__.MatSliderModule,
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__.MatSnackBarModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltipModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](PlayerModule, { declarations: [_player_component__WEBPACK_IMPORTED_MODULE_0__.PlayerComponent,
        _play_queue_component__WEBPACK_IMPORTED_MODULE_3__.PlayQueueComponent,
        _player_dialog__WEBPACK_IMPORTED_MODULE_4__.PlayerDialog], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__.DragDropModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__.FlexLayoutModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCardModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_11__.MatDividerModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_13__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_15__.MatProgressBarModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_16__.MatSliderModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__.MatSnackBarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltipModule], exports: [_player_component__WEBPACK_IMPORTED_MODULE_0__.PlayerComponent] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetComponentScope"](_player_dialog__WEBPACK_IMPORTED_MODULE_4__.PlayerDialog, [_angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _player_component__WEBPACK_IMPORTED_MODULE_0__.PlayerComponent], []);


/***/ }),

/***/ 7143:
/*!******************************************!*\
  !*** ./src/app/player/player.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerService": () => (/* binding */ PlayerService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _playlist_playlist_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../playlist/playlist.model */ 5570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _security_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../security/auth.service */ 7829);
/* harmony import */ var _playlist_playlist_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../playlist/playlist.service */ 3371);






class PlayerService {
    constructor(authService, playlistService) {
        this.authService = authService;
        this.playlistService = playlistService;
        this.playSource = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
        this.listChange = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
        this.play$ = this.playSource.asObservable();
        this.listchange$ = this.listChange.asObservable();
        this.songlist = [];
        this.LOCALSTORAGE_PREFIX = "PLAYQUEUE-";
    }
    playSong(song) {
        this.currentSong = song;
        this.playSource.next(song);
    }
    addAndPlaySong(song) {
        let found = this.songlist.find(s => s.songId == song.songId);
        if (found === null || found === undefined) {
            this.addSong(song);
            found = song;
        }
        this.playSong(found);
    }
    addSong(song) {
        this.songlist.push(song);
        this.storePlayqueue();
        this.listChange.next(this.songlist);
    }
    clearQueue() {
        this.songlist = [];
        this.storePlayqueue();
        this.listChange.next(this.songlist);
    }
    createPlaylist(name) {
        let pl = new _playlist_playlist_model__WEBPACK_IMPORTED_MODULE_1__.Playlist(null, name, null);
        this.playlistService.savePlaylist(pl).subscribe(p => {
            let songIds = [];
            for (let song of this.songlist) {
                songIds.push(song.songId);
            }
            this.playlistService.addSongsToPlaylist(p.playlistId, songIds).subscribe(() => {
                console.log("Success writing playlist");
            }, error => { console.log("Error writing playlist: " + error); });
        }, error => { console.log("Error creating playlist: " + error); });
    }
    nextSong() {
        if (this.songlist.length > 0) {
            if (this.currentSong === null || this.currentSong === undefined) {
                this.playSong(this.songlist[0]);
            }
            else {
                const index = this.songlist.indexOf(this.currentSong) + 1;
                if (index < this.songlist.length) {
                    this.playSong(this.songlist[index]);
                }
            }
        }
    }
    previousSong() {
        if (this.songlist.length > 0) {
            if (this.currentSong === null || this.currentSong === undefined) {
                this.playSong(this.songlist[0]);
            }
            else {
                const index = this.songlist.indexOf(this.currentSong) - 1;
                if (index >= 0) {
                    this.playSong(this.songlist[index]);
                }
            }
        }
    }
    removeSongByIndex(i) {
        if (i < this.songlist.length) {
            this.songlist.splice(i, 1);
            this.storePlayqueue();
            this.listChange.next(this.songlist);
        }
    }
    playSongByIndex(i) {
        if (i < this.songlist.length) {
            this.playSong(this.songlist[i]);
        }
    }
    songCoverUrl(song) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/song/" + song.songId + "/cover?bearer=" + this.authService.getToken();
    }
    songStreamUrl(song) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/song/" + song.songId + "/stream?bearer=" + this.authService.getToken();
    }
    storePlayqueue() {
        let username = this.authService.getLoggedInUsername();
        localStorage.setItem(this.LOCALSTORAGE_PREFIX + username, JSON.stringify(this.songlist));
        console.log("Saved currend playqueue");
    }
    loadPlayqueue() {
        console.log("Try to load playqueue");
        let username = this.authService.getLoggedInUsername();
        let s = localStorage.getItem(this.LOCALSTORAGE_PREFIX + username);
        if (s !== null) {
            this.songlist = JSON.parse(s);
            console.log("loaded currend playqueue");
            this.listChange.next(this.songlist);
        }
    }
}
PlayerService.ɵfac = function PlayerService_Factory(t) { return new (t || PlayerService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_security_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_playlist_playlist_service__WEBPACK_IMPORTED_MODULE_3__.PlaylistService)); };
PlayerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: PlayerService, factory: PlayerService.ɵfac });


/***/ }),

/***/ 3103:
/*!*******************************************************!*\
  !*** ./src/app/playlist/playlist-detail.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistDetailComponent": () => (/* binding */ PlaylistDetailComponent)
/* harmony export */ });
/* harmony import */ var _playlist_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist.model */ 5570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _playlist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.service */ 3371);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button-toggle */ 2077);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/expansion */ 5082);












const _c0 = ["name"];
const _c1 = ["query"];
function PlaylistDetailComponent_mat_button_toggle_group_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-button-toggle-group", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-button-toggle", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_button_toggle_group_0_Template_mat_button_toggle_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.kind = ctx_r5.KIND_QUERY; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "With query");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-button-toggle", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_button_toggle_group_0_Template_mat_button_toggle_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r7.kind = ctx_r7.KIND_EMPTY; });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Manual selection");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r0.kind === ctx_r0.KIND_QUERY);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r0.kind === ctx_r0.KIND_EMPTY);
} }
function PlaylistDetailComponent_mat_form_field_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "input", 14, 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function PlaylistDetailComponent_a_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Show");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/song/playlist/", ctx_r3.playlist == null ? null : ctx_r3.playlist.playlistId, "");
} }
function PlaylistDetailComponent_mat_accordion_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-accordion", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-expansion-panel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-expansion-panel-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Available fields ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r9.queryAdd("album"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "album");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.queryAdd("artist"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "artist");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r12.queryAdd("song"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "song");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r13.queryAdd("genre"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "genre");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r14.queryAdd("duration"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r15.queryAdd("year"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "year");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r16.queryAdd("track"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "track");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r17.queryAdd("path"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "path");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r18.queryAdd("bitrate"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "bitrate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_23_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r19.queryAdd("samplerate"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "samplerate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "mat-expansion-panel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "mat-expansion-panel-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, " Available logical operations ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_29_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r20.queryAdd("=="); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "==");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r21.queryAdd("!="); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "!=");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_33_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r22.queryAdd(">"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, ">");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_35_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r23.queryAdd(">="); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, ">=");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_37_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r24.queryAdd("<"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "<");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_39_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r25.queryAdd("<="); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "<=");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_41_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r26.queryAdd("&&"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "&&");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_mat_accordion_16_Template_button_click_43_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r27.queryAdd("||"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "||");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("multi", true);
} }
class PlaylistDetailComponent {
    constructor(router, route, playlistService) {
        this.router = router;
        this.route = route;
        this.playlistService = playlistService;
        this.KIND_QUERY = "query";
        this.KIND_EMPTY = "empty";
        this.kind = this.KIND_QUERY;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (params.get('id') === null || params.get('id') === "new") {
                this.playlist = new _playlist_model__WEBPACK_IMPORTED_MODULE_0__.Playlist("", "", "");
                return;
            }
            this.playlistService.getPlaylist(params.get('id')).subscribe((playlist) => {
                this.playlist = playlist;
                this.nameInput.nativeElement.value = this.playlist.name;
                if (this.queryInput !== null && this.queryInput !== undefined) {
                    this.queryInput.nativeElement.value = this.playlist.query;
                    this.kind = this.KIND_QUERY;
                }
                else {
                    this.kind = this.KIND_EMPTY;
                }
            });
        });
    }
    save() {
        this.playlist.name = this.nameInput.nativeElement.value;
        if (this.queryInput !== null && this.queryInput !== undefined) {
            this.playlist.query = this.queryInput.nativeElement.value;
        }
        this.playlistService.savePlaylist(this.playlist).subscribe(() => {
            this.router.navigate(["/playlist"]);
        });
    }
    isNew() {
        if (this.playlist !== null && this.playlist !== undefined) {
            if (this.playlist.playlistId === "" || this.playlist.playlistId === null) {
                return true;
            }
        }
        return false;
    }
    queryAdd(s) {
        this.queryInput.nativeElement.value = this.queryInput.nativeElement.value + s;
        this.queryInput.nativeElement.focus();
    }
}
PlaylistDetailComponent.ɵfac = function PlaylistDetailComponent_Factory(t) { return new (t || PlaylistDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_playlist_service__WEBPACK_IMPORTED_MODULE_1__.PlaylistService)); };
PlaylistDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PlaylistDetailComponent, selectors: [["app-playlist-detail"]], viewQuery: function PlaylistDetailComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.nameInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.queryInput = _t.first);
    } }, decls: 17, vars: 4, consts: [["class", "full-width", "name", "type", "aria-label", "Playlisttype", 4, "ngIf"], [1, "edit-playlist-form"], ["hideRequiredMarker", "", 1, "full-width"], ["matInput", "", "placeholder", "Name", "required", ""], ["name", ""], ["class", "full-width", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "routerLink", "/playlist"], ["mat-flat-button", "", "color", "accent", 3, "routerLink", 4, "ngIf"], [3, "multi", 4, "ngIf"], ["name", "type", "aria-label", "Playlisttype", 1, "full-width"], ["value", "query", 3, "checked", "click"], ["value", "empty", 3, "checked", "click"], [1, "full-width"], ["matInput", "", "placeholder", "Query"], ["query", ""], ["mat-flat-button", "", "color", "accent", 3, "routerLink"], [3, "multi"], ["mat-button", "", 3, "click"]], template: function PlaylistDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, PlaylistDetailComponent_mat_button_toggle_group_0_Template, 5, 2, "mat-button-toggle-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, PlaylistDetailComponent_mat_form_field_5_Template, 3, 0, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistDetailComponent_Template_button_click_6_listener() { return ctx.save(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "done");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " Save ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "undo");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, PlaylistDetailComponent_a_14_Template, 4, 1, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, PlaylistDetailComponent_mat_accordion_16_Template, 45, 1, "mat-accordion", 9);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isNew());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.kind === ctx.KIND_QUERY);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isNew());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.kind === ctx.KIND_QUERY);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__.MatButtonToggleGroup, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__.MatButtonToggle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__.MatExpansionPanelTitle], styles: [".edit-playlist-form[_ngcontent-%COMP%] {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXlsaXN0LWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0YiLCJmaWxlIjoicGxheWxpc3QtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVkaXQtcGxheWxpc3QtZm9ybSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZnVsbC13aWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuIl19 */"] });


/***/ }),

/***/ 9964:
/*!*****************************************************!*\
  !*** ./src/app/playlist/playlist-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistRoutingModule": () => (/* binding */ PlaylistRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _playlist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.component */ 5262);
/* harmony import */ var _playlist_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist-detail.component */ 3103);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);






const playlistRoutes = [
    { path: 'playlist', component: _playlist_component__WEBPACK_IMPORTED_MODULE_1__.PlaylistComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
    { path: 'playlist/:id', component: _playlist_detail_component__WEBPACK_IMPORTED_MODULE_2__.PlaylistDetailComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
];
class PlaylistRoutingModule {
}
PlaylistRoutingModule.ɵfac = function PlaylistRoutingModule_Factory(t) { return new (t || PlaylistRoutingModule)(); };
PlaylistRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PlaylistRoutingModule });
PlaylistRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(playlistRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PlaylistRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 5262:
/*!************************************************!*\
  !*** ./src/app/playlist/playlist.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistComponent": () => (/* binding */ PlaylistComponent)
/* harmony export */ });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ 8178);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _playlist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.service */ 3371);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);








function PlaylistComponent_mat_list_item_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistComponent_mat_list_item_5_Template_a_click_7_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3); const playlist_r1 = restoredCtx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r2.delete(playlist_r1.playlistId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PlaylistComponent_mat_list_item_5_Template_a_click_10_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3); const playlist_r1 = restoredCtx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.xspf(playlist_r1.playlistId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const playlist_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/song/playlist/", playlist_r1.playlistId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/playlist/", playlist_r1.playlistId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u00A0", playlist_r1.name, "");
} }
class PlaylistComponent {
    constructor(playlistService, router) {
        this.playlistService = playlistService;
        this.router = router;
    }
    ngOnInit() {
        this.playlistService.getPlaylists().subscribe((playlists) => {
            this.playlists = playlists.playlists;
        });
    }
    delete(playlistId) {
        this.playlistService.deletePlaylist(playlistId).subscribe(() => {
            console.log("Playlist deleted");
            this.router.navigate(["/playlist"]);
        });
    }
    xspf(playlistId) {
        this.playlistService.exportPlaylistToXSPF(playlistId).subscribe(data => {
            (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(data, playlistId + ".xspf");
        }, error => console.error(error));
    }
}
PlaylistComponent.ɵfac = function PlaylistComponent_Factory(t) { return new (t || PlaylistComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_playlist_service__WEBPACK_IMPORTED_MODULE_1__.PlaylistService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router)); };
PlaylistComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PlaylistComponent, selectors: [["app-playlist"]], decls: 6, vars: 1, consts: [["mat-button", "", "routerLink", "/playlist/new"], [4, "ngFor", "ngForOf"], [3, "routerLink"], ["mat-list-icon", "", "color", "accent"], ["href", "", 3, "click"]], template: function PlaylistComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Add playlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, PlaylistComponent_mat_list_item_5_Template, 15, 3, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.playlists);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatList, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatListItem, _angular_material_list__WEBPACK_IMPORTED_MODULE_6__.MatListIconCssMatStyler], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGF5bGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 5570:
/*!********************************************!*\
  !*** ./src/app/playlist/playlist.model.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Playlist": () => (/* binding */ Playlist),
/* harmony export */   "PlaylistCollection": () => (/* binding */ PlaylistCollection)
/* harmony export */ });
class Playlist {
    constructor(playlistId, name, query) {
        this.playlistId = playlistId;
        this.name = name;
        this.query = query;
    }
}
class PlaylistCollection {
    constructor(playlists, paging, total) {
        this.playlists = playlists;
        this.paging = paging;
        this.total = total;
    }
}


/***/ }),

/***/ 2569:
/*!*********************************************!*\
  !*** ./src/app/playlist/playlist.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistModule": () => (/* binding */ PlaylistModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _playlist_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playlist.component */ 5262);
/* harmony import */ var _playlist_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-detail.component */ 3103);
/* harmony import */ var _playlist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playlist.service */ 3371);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button-toggle */ 2077);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/expansion */ 5082);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);















class PlaylistModule {
}
PlaylistModule.ɵfac = function PlaylistModule_Factory(t) { return new (t || PlaylistModule)(); };
PlaylistModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PlaylistModule });
PlaylistModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [
        _playlist_service__WEBPACK_IMPORTED_MODULE_2__.PlaylistService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__.MatButtonToggleModule,
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PlaylistModule, { declarations: [_playlist_component__WEBPACK_IMPORTED_MODULE_0__.PlaylistComponent,
        _playlist_detail_component__WEBPACK_IMPORTED_MODULE_1__.PlaylistDetailComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__.MatButtonToggleModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListModule], exports: [_playlist_component__WEBPACK_IMPORTED_MODULE_0__.PlaylistComponent] }); })();


/***/ }),

/***/ 3371:
/*!**********************************************!*\
  !*** ./src/app/playlist/playlist.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistService": () => (/* binding */ PlaylistService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);




class PlaylistService {
    constructor(http) {
        this.http = http;
    }
    getPlaylists() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
            'x-klaus': 'fred'
        });
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist", { headers: headers });
    }
    getStaticPlaylists() {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist?kind=static");
    }
    getPlaylist(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + id);
    }
    addSongsToPlaylist(playlistId, songIds) {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + playlistId + "/songs", songIds);
    }
    savePlaylist(playlist) {
        console.log("Save: " + playlist.playlistId + "=" + playlist.name);
        if (playlist.playlistId === null || playlist.playlistId === "") {
            return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist", playlist);
        }
        else {
            return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist", playlist);
        }
    }
    deletePlaylist(playlistId) {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + playlistId);
    }
    exportPlaylistToXSPF(playlistId) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + playlistId + "/xspf", { responseType: "blob" });
    }
}
PlaylistService.ɵfac = function PlaylistService_Factory(t) { return new (t || PlaylistService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
PlaylistService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: PlaylistService, factory: PlaylistService.ɵfac });


/***/ }),

/***/ 5579:
/*!************************************************!*\
  !*** ./src/app/security/auth-guard.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuardService": () => (/* binding */ AuthGuardService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 7529);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 7829);




class AuthGuardService {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate(next, state) {
        return this.authService.isLoggedIn
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((isLoggedIn) => {
            if (!isLoggedIn) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }));
    }
}
AuthGuardService.ɵfac = function AuthGuardService_Factory(t) { return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService)); };
AuthGuardService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AuthGuardService, factory: AuthGuardService.ɵfac });


/***/ }),

/***/ 7829:
/*!******************************************!*\
  !*** ./src/app/security/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService),
/* harmony export */   "Auth": () => (/* binding */ Auth)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);






class AuthService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.AUTH = "go2music_auth";
        this.auth = JSON.parse(localStorage.getItem(this.AUTH));
        this.loggedIn = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
        this.token = null;
        if (this.auth) {
            this.token = this.auth.token;
            this.loggedIn.next(true);
        }
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    isAdmin() {
        if (this.isNullOrUndefined(this.auth)) {
            return false;
        }
        return this.auth.isAdmin;
    }
    getToken() {
        return this.token;
    }
    getLoggedInUsername() {
        if (!this.isNullOrUndefined(this.auth)) {
            return this.auth.username;
        }
        return "";
    }
    login(username, password) {
        if (username !== '' && password !== '') {
            let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders();
            headers = headers.append("Authorization", "Basic " + btoa(username + ":" + password));
            // headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
            this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/token", { headers: headers }).subscribe(response => {
                this.token = response['token'];
                this.auth = new Auth(response['token'], username, response['role'] === "admin");
                console.log("Successfully logged in with token " + this.token);
                this.loggedIn.next(true);
                localStorage.setItem(this.AUTH, JSON.stringify(this.auth));
                this.router.navigate(['/']);
            }, error => {
                console.log("Got an error while logging in");
                this.loggedIn.next(false);
            });
        }
    }
    logout() {
        this.loggedIn.next(false);
        this.auth = null;
        localStorage.removeItem(this.AUTH);
        this.router.navigate(['/login']);
    }
    // for debugging
    clearToken() {
        this.token = null;
    }
    isNullOrUndefined(o) {
        return o === null || o === undefined;
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });
class Auth {
    constructor(token, username, isAdmin) {
        this.token = token;
        this.username = username;
        this.isAdmin = isAdmin;
    }
}


/***/ }),

/***/ 3170:
/*!*********************************************!*\
  !*** ./src/app/security/login.component.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 7829);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ 8359);







class LoginComponent {
    constructor(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
    }
    login() {
        this.authService.login(this.username, this.password);
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.message = params.get("message");
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute)); };
LoginComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 19, vars: 2, consts: [[1, "login-card"], [1, "login-form"], ["cellspacing", "0", 1, "full-width-input"], [1, "full-width-input"], ["matInput", "", "placeholder", "Username", "name", "username", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "Password", "type", "password", "name", "password", "required", "", 3, "ngModel", "ngModelChange"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-form-field", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_11_listener($event) { return ctx.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-form-field", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_15_listener($event) { return ctx.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_17_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.password);
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardActions], styles: ["mat-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 2em auto;\n  text-align: center;\n}\n\n.signin-content[_ngcontent-%COMP%] {\n  padding: 60px 1rem;\n}\n\n.full-width-input[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nmat-card-title[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  margin-left: -16px;\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGOztBQUFBO0VBQ0UsV0FBQTtBQUdGOztBQURBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FBSUYiLCJmaWxlIjoibG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtY2FyZCB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMmVtIGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zaWduaW4tY29udGVudCB7XG4gIHBhZGRpbmc6IDYwcHggMXJlbTtcbn1cbi5mdWxsLXdpZHRoLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5tYXQtY2FyZC10aXRsZSA+IHNwYW4ge1xuICBtYXJnaW4tbGVmdDogLTE2cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG4iXX0= */"] });


/***/ }),

/***/ 6072:
/*!*****************************************************!*\
  !*** ./src/app/security/security-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SecurityRoutingModule": () => (/* binding */ SecurityRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ 3170);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);




const securityRoutes = [
    { path: 'login', component: _login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent }
];
class SecurityRoutingModule {
}
SecurityRoutingModule.ɵfac = function SecurityRoutingModule_Factory(t) { return new (t || SecurityRoutingModule)(); };
SecurityRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SecurityRoutingModule });
SecurityRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(securityRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SecurityRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 7401:
/*!*********************************************!*\
  !*** ./src/app/security/security.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SecurityModule": () => (/* binding */ SecurityModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ 3170);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 7829);
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-guard.service */ 5579);
/* harmony import */ var _token_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./token.interceptor */ 8102);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);












class SecurityModule {
}
SecurityModule.ɵfac = function SecurityModule_Factory(t) { return new (t || SecurityModule)(); };
SecurityModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SecurityModule });
SecurityModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [
        _auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService,
        _auth_guard_service__WEBPACK_IMPORTED_MODULE_2__.AuthGuardService,
        {
            provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HTTP_INTERCEPTORS,
            useClass: _token_interceptor__WEBPACK_IMPORTED_MODULE_3__.TokenInterceptor,
            multi: true
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SecurityModule, { declarations: [_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule], exports: [_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent] }); })();


/***/ }),

/***/ 8102:
/*!***********************************************!*\
  !*** ./src/app/security/token.interceptor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenInterceptor": () => (/* binding */ TokenInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6769);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2489);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 7829);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);






class TokenInterceptor {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    intercept(request, next) {
        if (!request.url.endsWith("/token")) {
            request = request.clone({
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
                    'Authorization': `Bearer ${this.auth.getToken()}`
                })
            });
        }
        return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(response => {
            if (response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpErrorResponse) {
                if (response.status === 401) {
                    this.router.navigate(["/login" /*, {message: "Token not found or invalid."}*/]);
                }
            }
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(response);
        }));
    }
}
TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router)); };
TokenInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });


/***/ }),

/***/ 8135:
/*!****************************************!*\
  !*** ./src/app/shared/base.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseService": () => (/* binding */ BaseService)
/* harmony export */ });
class BaseService {
    getPagingForUrl(paging) {
        let s = "";
        if (paging === null || paging === undefined) {
            return s;
        }
        if (paging.sort !== null && paging.sort !== undefined) {
            s += "sort=" + paging.sort;
            if (paging.dir === null || paging.dir === undefined) {
                s += "&dir=asc";
            }
            else {
                s += "&dir=" + paging.dir;
            }
        }
        if (paging.size > 0) {
            if (s !== "") {
                s += "&";
            }
            s += "size=" + paging.size;
            if (paging.page > 0) {
                s += "&page=" + paging.page;
            }
        }
        if (s !== "") {
            s = "?" + s;
        }
        return s;
    }
}


/***/ }),

/***/ 1616:
/*!*****************************************!*\
  !*** ./src/app/shared/duration.pipe.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DurationPipe": () => (/* binding */ DurationPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);

class DurationPipe {
    transform(value) {
        if (isNaN(value)) {
            return "";
        }
        const hours = Math.trunc(value / 3600);
        let seconds = value % 3600;
        const minutes = Math.trunc(seconds / 60);
        seconds = seconds % 60;
        if (hours > 0) {
            return "" + hours + ":" + this.pad(minutes, 2) + ":" + this.pad(seconds, 2);
        }
        return "" + minutes + ":" + this.pad(seconds, 2);
    }
    pad(num, size) {
        return ('000000000' + num).substr(-size);
    }
}
DurationPipe.ɵfac = function DurationPipe_Factory(t) { return new (t || DurationPipe)(); };
DurationPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "duration", type: DurationPipe, pure: true });


/***/ }),

/***/ 8080:
/*!****************************************!*\
  !*** ./src/app/shared/paging.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paging": () => (/* binding */ Paging)
/* harmony export */ });
class Paging {
    constructor(page, size, sort, dir) {
        this.page = page;
        this.size = size;
        this.sort = sort;
        this.dir = dir;
    }
}


/***/ }),

/***/ 1382:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _duration_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./duration.pipe */ 1616);
/* harmony import */ var _unixdate_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unixdate.pipe */ 9161);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _textinput_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textinput-dialog.component */ 6978);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _yesno_alert_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./yesno-alert.component */ 4922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);










class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_duration_pipe__WEBPACK_IMPORTED_MODULE_0__.DurationPipe,
        _unixdate_pipe__WEBPACK_IMPORTED_MODULE_1__.UnixdatePipe,
        _textinput_dialog_component__WEBPACK_IMPORTED_MODULE_2__.TextinputDialogComponent,
        _yesno_alert_component__WEBPACK_IMPORTED_MODULE_3__.YesnoAlertComponent], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__.MatDialogModule], exports: [_duration_pipe__WEBPACK_IMPORTED_MODULE_0__.DurationPipe,
        _unixdate_pipe__WEBPACK_IMPORTED_MODULE_1__.UnixdatePipe,
        _textinput_dialog_component__WEBPACK_IMPORTED_MODULE_2__.TextinputDialogComponent,
        _yesno_alert_component__WEBPACK_IMPORTED_MODULE_3__.YesnoAlertComponent] }); })();


/***/ }),

/***/ 6978:
/*!******************************************************!*\
  !*** ./src/app/shared/textinput-dialog.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextinputData": () => (/* binding */ TextinputData),
/* harmony export */   "TextinputDialogComponent": () => (/* binding */ TextinputDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 7752);







class TextinputData {
    constructor(title, prompt, input) {
        this.title = title;
        this.prompt = prompt;
        this.input = input;
    }
}
class TextinputDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onCancelClick() {
        this.dialogRef.close();
    }
}
TextinputDialogComponent.ɵfac = function TextinputDialogComponent_Factory(t) { return new (t || TextinputDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA)); };
TextinputDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TextinputDialogComponent, selectors: [["textinput-dialog"]], decls: 10, vars: 4, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["matInput", "", 3, "ngModel", "placeholder", "ngModelChange"], ["mat-dialog-actions", ""], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "mat-dialog-close"]], template: function TextinputDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TextinputDialogComponent_Template_input_ngModelChange_4_listener($event) { return ctx.data.input = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TextinputDialogComponent_Template_button_click_6_listener() { return ctx.onCancelClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Ok");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", ctx.data.prompt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.data.input);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", ctx.data.input);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_3__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogClose], encapsulation: 2 });


/***/ }),

/***/ 9161:
/*!*****************************************!*\
  !*** ./src/app/shared/unixdate.pipe.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnixdatePipe": () => (/* binding */ UnixdatePipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);

class UnixdatePipe {
    transform(value) {
        return new Date(value);
    }
}
UnixdatePipe.ɵfac = function UnixdatePipe_Factory(t) { return new (t || UnixdatePipe)(); };
UnixdatePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "unixdate", type: UnixdatePipe, pure: true });


/***/ }),

/***/ 4922:
/*!*************************************************!*\
  !*** ./src/app/shared/yesno-alert.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertData": () => (/* binding */ AlertData),
/* harmony export */   "YesnoAlertComponent": () => (/* binding */ YesnoAlertComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 7752);




class AlertData {
    constructor(title, prompt) {
        this.title = title;
        this.prompt = prompt;
    }
}
class YesnoAlertComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
}
YesnoAlertComponent.ɵfac = function YesnoAlertComponent_Factory(t) { return new (t || YesnoAlertComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA)); };
YesnoAlertComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: YesnoAlertComponent, selectors: [["yesno-alert"]], decls: 9, vars: 3, consts: [["mat-dialog-title", ""], ["mat-button", "", "mat-dialog-close", ""], ["mat-button", "", 3, "mat-dialog-close"]], template: function YesnoAlertComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-dialog-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Yes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.prompt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogClose], encapsulation: 2 });


/***/ }),

/***/ 1205:
/*!**********************************************************!*\
  !*** ./src/app/song/playlist-select-dialog.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistSelectDialogComponent": () => (/* binding */ PlaylistSelectDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _playlist_playlist_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../playlist/playlist.service */ 3371);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ 4357);







function PlaylistSelectDialogComponent_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const playlist_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", playlist_r1.playlistId);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", playlist_r1.name, " ");
} }
class PlaylistSelectDialogComponent {
    constructor(playlistService, dialogRef) {
        this.playlistService = playlistService;
        this.dialogRef = dialogRef;
    }
    ngOnInit() {
        this.playlistService.getStaticPlaylists().subscribe(playlistCollection => this.playlists = playlistCollection.playlists);
    }
    save() {
        this.dialogRef.close(this.selectedPlaylistId);
    }
    close() {
        this.dialogRef.close();
    }
}
PlaylistSelectDialogComponent.ɵfac = function PlaylistSelectDialogComponent_Factory(t) { return new (t || PlaylistSelectDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_playlist_playlist_service__WEBPACK_IMPORTED_MODULE_0__.PlaylistService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef)); };
PlaylistSelectDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PlaylistSelectDialogComponent, selectors: [["app-playlist-select-dialog"]], decls: 11, vars: 2, consts: [["mat-dialog-title", ""], ["placeholder", "Playlist", 3, "value", "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "mat-raised-button", 3, "click"], [1, "mat-raised-button", "mat-primary", 3, "click"], [3, "value"]], template: function PlaylistSelectDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Add song to playlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-dialog-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function PlaylistSelectDialogComponent_Template_mat_select_valueChange_4_listener($event) { return ctx.selectedPlaylistId = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, PlaylistSelectDialogComponent_mat_option_5_Template, 2, 2, "mat-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-dialog-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PlaylistSelectDialogComponent_Template_button_click_7_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PlaylistSelectDialogComponent_Template_button_click_9_listener() { return ctx.save(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.selectedPlaylistId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.playlists);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_4__.MatSelect, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_core__WEBPACK_IMPORTED_MODULE_6__.MatOption], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGF5bGlzdC1zZWxlY3QtZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 8412:
/*!*********************************************!*\
  !*** ./src/app/song/song-list.component.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SongListComponent": () => (/* binding */ SongListComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 1082);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ 8178);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _playlist_select_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-select-dialog.component */ 1205);
/* harmony import */ var _song_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./song.datasource */ 9912);
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/paging.model */ 8080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _song_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./song.service */ 6735);
/* harmony import */ var _player_player_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../player/player.service */ 7143);
/* harmony import */ var _playlist_playlist_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../playlist/playlist.service */ 3371);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);
/* harmony import */ var _shared_duration_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/duration.pipe */ 1616);
























const _c0 = ["input"];
function SongListComponent_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_icon_3_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r13.downloadAlbum(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "get_app ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_icon_4_Template_mat_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r15.downloadPlaylist(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "get_app ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_mat_header_cell_16_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_header_cell_16_Template_mat_icon_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r17.queueSongs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "queue_music");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_mat_cell_17_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_cell_17_Template_mat_icon_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21); const song_r19 = restoredCtx.$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r20.playSong(song_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "play_arrow ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_cell_17_Template_mat_icon_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21); const song_r19 = restoredCtx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r22.queueSong(song_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "queue_music ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_mat_cell_17_Template_mat_icon_click_5_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21); const song_r19 = restoredCtx.$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r23.addSongToPlaylist(song_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "playlist_add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_ng_container_18_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-header-cell", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const column_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](column_r24.title);
} }
function SongListComponent_ng_container_18_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-cell", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SongListComponent_ng_container_18_mat_cell_2_Template_mat_cell_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30); const song_r28 = restoredCtx.$implicit; const column_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r29.cellClicked(song_r28, column_r24.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r28 = ctx.$implicit;
    const column_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r26.getProperty(song_r28, column_r24.name), " ");
} }
function SongListComponent_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SongListComponent_ng_container_18_mat_header_cell_1_Template, 2, 1, "mat-header-cell", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, SongListComponent_ng_container_18_mat_cell_2_Template, 2, 1, "mat-cell", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const column_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matColumnDef", column_r24.name);
} }
function SongListComponent_mat_header_cell_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-header-cell", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function SongListComponent_mat_cell_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "duration");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const song_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, song_r33.duration), "");
} }
function SongListComponent_mat_header_row_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "mat-header-row");
} }
function SongListComponent_mat_row_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "mat-row");
} }
const _c1 = function (a0) { return { "cover": a0 }; };
class SongListComponent {
    constructor(router, route, songService, playerService, playlistService, dialog) {
        this.router = router;
        this.route = route;
        this.songService = songService;
        this.playerService = playerService;
        this.playlistService = playlistService;
        this.dialog = dialog;
        this.columnDefs = [
            { name: 'title', title: 'Title' },
            { name: 'artist.name', title: 'Artist' },
            { name: 'album.title', title: 'Album' },
            { name: 'track', title: 'Tack' },
            { name: 'genre', title: 'Genre' },
            { name: 'yearPublished', title: 'Year' } /*,
            {name: 'duration', title: 'Duration'}*/
        ];
        this.headline = "";
        this.kind = "";
        this.anyId = "";
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 20, 30];
        this.total = 0;
        this.embedded = false;
        this.displayedColumns = ['command', 'title', 'artist.name', 'album.title', 'track', 'genre', 'yearPublished', 'duration'];
        this.getProperty = (obj, path) => (path.split('.').reduce((o, p) => o && o[p], obj));
    }
    ngOnInit() {
        if (localStorage.getItem("pageSize")) {
            this.pageSize = +localStorage.getItem("pageSize");
        }
        this.dataSource = new _song_datasource__WEBPACK_IMPORTED_MODULE_2__.SongDataSource(this.songService);
        if (!this.embedded) {
            this.route.paramMap.subscribe((params) => {
                if (params.has("type")) {
                    this.kind = params.get("type");
                    this.anyId = params.get("id");
                }
                let sortField = "";
                if (this.kind === "album") {
                    sortField = "track";
                }
                else if (this.kind === "artist") {
                    sortField = "album.name";
                }
                this.dataSource.loadSongs(this.kind, this.anyId, "", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_3__.Paging(0, this.pageSize, sortField, "asc"));
                this.dataSource.songTotalSubject.subscribe(total => {
                    this.total = total;
                });
                this.dataSource.songDescriptionSubject.subscribe(s => this.headline = s);
            });
        }
    }
    ngAfterViewInit() {
        // server-side search
        (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.fromEvent)(this.input.nativeElement, 'keyup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.debounceTime)(150), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.tap)(() => {
            this.paginator.pageIndex = 0;
            this.loadSongsPage();
        }))
            .subscribe();
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.merge)(this.sort.sortChange, this.paginator.page)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.tap)(() => this.loadSongsPage()))
            .subscribe();
    }
    loadSongsPage() {
        localStorage.setItem("pageSize", "" + this.paginator.pageSize);
        this.dataSource.loadSongs(this.kind, this.anyId, this.input.nativeElement.value, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_3__.Paging(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction));
    }
    playSong(song) {
        this.playerService.addAndPlaySong(song);
    }
    queueSong(song) {
        this.playerService.addSong(song);
    }
    queueSongs() {
        this.dataSource.songs.forEach(song => this.playerService.addSong(song));
    }
    addSongToPlaylist(song) {
        const dialogConfig = new _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialog = this.dialog.open(_playlist_select_dialog_component__WEBPACK_IMPORTED_MODULE_1__.PlaylistSelectDialogComponent, dialogConfig);
        dialog.afterClosed().subscribe(v => {
            if (v !== undefined) {
                this.playlistService.addSongsToPlaylist(v, [song.songId]).subscribe(r => console.log(r));
            }
        });
    }
    cellClicked(song, column) {
        if (column === "album.title") {
            this.router.navigate(["/song/album/" + song.album.albumId]);
        }
        else if (column === "artist.name") {
            this.router.navigate(["/song/artist/" + song.artist.artistId]);
        }
        else if (column === "genre") {
            this.router.navigate(["/song/genre/" + song.genre]);
        }
    }
    downloadAlbum() {
        this.songService.downloadAlbum(this.anyId).subscribe(data => {
            (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(data, this.kind + " - " + this.anyId);
        }, error => console.error(error));
    }
    downloadPlaylist() {
        this.songService.downloadPlaylist(this.anyId).subscribe(data => {
            (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(data, this.kind + " - " + this.anyId);
        }, error => console.error(error));
    }
}
SongListComponent.ɵfac = function SongListComponent_Factory(t) { return new (t || SongListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_song_service__WEBPACK_IMPORTED_MODULE_4__.SongService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_player_player_service__WEBPACK_IMPORTED_MODULE_5__.PlayerService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_playlist_playlist_service__WEBPACK_IMPORTED_MODULE_6__.PlaylistService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__.MatDialog)); };
SongListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: SongListComponent, selectors: [["app-song-list"]], viewQuery: function SongListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSort, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, inputs: { embedded: "embedded" }, decls: 26, vars: 21, consts: [[1, "song", 3, "ngClass"], ["class", "only-on-hover", "color", "accent", 3, "click", 4, "ngIf"], ["matInput", ""], ["input", ""], ["class", "spinner-container", 4, "ngIf"], ["matSort", "", 1, "songs-table", 3, "dataSource"], ["songtable", ""], ["matColumnDef", "command"], [4, "matHeaderCellDef"], [4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["matColumnDef", "duration"], ["mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], [3, "length", "pageSize", "pageSizeOptions", "showFirstLastButtons"], ["paginator", ""], ["color", "accent", 1, "only-on-hover", 3, "click"], [1, "spinner-container"], [3, "matColumnDef"], [3, "click", 4, "matCellDef"], ["mat-sort-header", ""], [3, "click"]], template: function SongListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, SongListComponent_mat_icon_3_Template, 2, 0, "mat-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, SongListComponent_mat_icon_4_Template, 2, 0, "mat-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "mat-placeholder");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, SongListComponent_div_11_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-table", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](15, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, SongListComponent_mat_header_cell_16_Template, 3, 0, "mat-header-cell", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, SongListComponent_mat_cell_17_Template, 7, 0, "mat-cell", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, SongListComponent_ng_container_18_Template, 3, 1, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](19, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, SongListComponent_mat_header_cell_20_Template, 2, 0, "mat-header-cell", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, SongListComponent_mat_cell_21_Template, 3, 3, "mat-cell", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](22, SongListComponent_mat_header_row_22_Template, 1, 0, "mat-header-row", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](23, SongListComponent_mat_row_23_Template, 1, 0, "mat-row", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](24, "mat-paginator", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](19, _c1, ctx.kind === "album"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("visibility", ctx.kind !== "" ? "visible" : "hidden");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.headline);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.kind === "album");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.kind === "playlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("visibility", ctx.kind === "" ? "visible" : "hidden");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 17, ctx.dataSource.loading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.columnDefs);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("length", ctx.total)("pageSize", ctx.pageSize)("pageSizeOptions", ctx.pageSizeOptions)("showFirstLastButtons", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__.MatPlaceholder, _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSort, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatCellDef, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatRowDef, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__.MatPaginator, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_23__.MatSpinner, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_22__.MatRow], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.AsyncPipe, _shared_duration_pipe__WEBPACK_IMPORTED_MODULE_7__.DurationPipe], styles: [".mat-row[_ngcontent-%COMP%] {\n  min-height: 0px;\n  padding: 2px 0px 2px 0px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-row[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n\n.mat-cell[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-header-cell[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-header-row[_ngcontent-%COMP%] {\n  min-height: 40px;\n  padding: 0 0;\n}\n\n.mat-column-command[_ngcontent-%COMP%] {\n  flex: 0 0 7%;\n}\n\n.mat-column-title[_ngcontent-%COMP%] {\n  flex: 0 0 25%;\n}\n\n.mat-column-artist[_ngcontent-%COMP%] {\n  flex: 0 0 20%;\n}\n\n.mat-column-album[_ngcontent-%COMP%] {\n  flex: 0 0 20%;\n}\n\n.mat-column-duration[_ngcontent-%COMP%] {\n  flex: 0 0 8%;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.mat-column-yearPublished[_ngcontent-%COMP%] {\n  flex: 0 0 5%;\n}\n\n.mat-column-track[_ngcontent-%COMP%] {\n  flex: 0 0 5%;\n  display: flex;\n  justify-content: flex-end;\n  margin-right: 5px;\n}\n\n.mat-column-genre[_ngcontent-%COMP%] {\n  flex: 0 0 10%;\n}\n\n.only-on-hover[_ngcontent-%COMP%] {\n  opacity: 0.25;\n  transition: all ease 0.8s;\n  font-size: 16px;\n  height: 16px;\n  width: 16px;\n  cursor: pointer;\n}\n\n.only-on-hover[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.spinner-container[_ngcontent-%COMP%] {\n  height: 360px;\n  width: 390px;\n  position: fixed;\n}\n\n.songs-table[_ngcontent-%COMP%] {\n  min-height: 360px;\n  margin-top: 10px;\n}\n\n.spinner-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin: 130px auto 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvbmctbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBRUY7O0FBQ0E7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUVGOztBQUNBO0VBQ0UsVUFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQ0E7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FBRUY7O0FBQ0E7RUFDRSx5QkFBQTtBQUVGIiwiZmlsZSI6InNvbmctbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtcm93IHtcbiAgbWluLWhlaWdodDogMHB4O1xuICBwYWRkaW5nOiAycHggMHB4IDJweCAwcHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4ubWF0LXJvdzpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm1hdC1jZWxsIHtcbiAgZm9udC1zaXplOiAwLjY2cmVtO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cbi5tYXQtaGVhZGVyLWNlbGwge1xuICBmb250LXNpemU6IDAuNjZyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4ubWF0LWhlYWRlci1yb3cge1xuICBtaW4taGVpZ2h0OiA0MHB4O1xuICBwYWRkaW5nOiAwIDA7XG59XG5cbi5tYXQtY29sdW1uLWNvbW1hbmQge1xuICBmbGV4OiAwIDAgNyU7XG59XG5cbi5tYXQtY29sdW1uLXRpdGxlIHtcbiAgZmxleDogMCAwIDI1JTtcbn1cblxuLm1hdC1jb2x1bW4tYXJ0aXN0IHtcbiAgZmxleDogMCAwIDIwJTtcbn1cblxuLm1hdC1jb2x1bW4tYWxidW0ge1xuICBmbGV4OiAwIDAgMjAlO1xufVxuXG4ubWF0LWNvbHVtbi1kdXJhdGlvbiB7XG4gIGZsZXg6IDAgMCA4JTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLm1hdC1jb2x1bW4teWVhclB1Ymxpc2hlZCB7XG4gIGZsZXg6IDAgMCA1JTtcbn1cblxuLm1hdC1jb2x1bW4tdHJhY2sge1xuICBmbGV4OiAwIDAgNSU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4ubWF0LWNvbHVtbi1nZW5yZSB7XG4gIGZsZXg6IDAgMCAxMCU7XG59XG5cbi5vbmx5LW9uLWhvdmVyIHtcbiAgb3BhY2l0eTogMC4yNTtcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UgMC44cztcbiAgZm9udC1zaXplOiAxNnB4O1xuICBoZWlnaHQ6IDE2cHg7XG4gIHdpZHRoOiAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5vbmx5LW9uLWhvdmVyOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLnNwaW5uZXItY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAzNjBweDtcbiAgd2lkdGg6IDM5MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG59XG5cbi5zb25ncy10YWJsZSB7XG4gIG1pbi1oZWlnaHQ6IDM2MHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uc3Bpbm5lci1jb250YWluZXIgbWF0LXNwaW5uZXIge1xuICBtYXJnaW46IDEzMHB4IGF1dG8gMCBhdXRvO1xufVxuXG4uY292ZXIge1xufVxuIl19 */"] });


/***/ }),

/***/ 143:
/*!*********************************************!*\
  !*** ./src/app/song/song-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SongRoutingModule": () => (/* binding */ SongRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _song_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./song-list.component */ 8412);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const songRoutes = [
    { path: 'song', component: _song_list_component__WEBPACK_IMPORTED_MODULE_1__.SongListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
    { path: 'song/:type/:id', component: _song_list_component__WEBPACK_IMPORTED_MODULE_1__.SongListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class SongRoutingModule {
}
SongRoutingModule.ɵfac = function SongRoutingModule_Factory(t) { return new (t || SongRoutingModule)(); };
SongRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SongRoutingModule });
SongRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(songRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SongRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 9912:
/*!*****************************************!*\
  !*** ./src/app/song/song.datasource.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SongDataSource": () => (/* binding */ SongDataSource)
/* harmony export */ });
/* harmony import */ var _song_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./song.model */ 6566);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8433);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2489);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3951);



class SongDataSource {
    constructor(songService) {
        this.songService = songService;
        this.songsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
        this.songTotalSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(0);
        this.songDescriptionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject("");
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
        this.songs = [];
        this.loading$ = this.loadingSubject.asObservable();
    }
    connect(collectionViewer) {
        return this.songsSubject.asObservable();
    }
    disconnect(collectionViewer) {
        this.songsSubject.complete();
        this.songTotalSubject.complete();
        this.songDescriptionSubject.complete();
        this.loadingSubject.complete();
    }
    loadSongs(kind, id, filter, paging) {
        this.loadingSubject.next(true);
        let songsObservable;
        if (kind === "") {
            songsObservable = this.songService.getAllSongs(filter, paging);
        }
        else if (kind === "album") {
            songsObservable = this.songService.getAllSongsOfAlbum(id, paging);
        }
        else if (kind === "artist") {
            songsObservable = this.songService.getAllSongsOfArtist(id, paging);
        }
        else if (kind === "playlist") {
            songsObservable = this.songService.getAllSongsOfPlaylist(id, paging);
        }
        else if (kind === "age") {
            songsObservable = this.songService.getAllSongsOfYear(id, paging);
        }
        else if (kind === "genre") {
            songsObservable = this.songService.getAllSongsOfGenre(id, paging);
        }
        songsObservable
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(new _song_model__WEBPACK_IMPORTED_MODULE_0__.SongCollection([], "", null, 0))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => this.loadingSubject.next(false)))
            .subscribe(songCollection => {
            this.songTotalSubject.next(songCollection.total);
            this.songDescriptionSubject.next(songCollection.description);
            this.songsSubject.next(songCollection.songs);
            this.songs = songCollection.songs;
        });
    }
}


/***/ }),

/***/ 6566:
/*!************************************!*\
  !*** ./src/app/song/song.model.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Song": () => (/* binding */ Song),
/* harmony export */   "SongCollection": () => (/* binding */ SongCollection)
/* harmony export */ });
class Song {
    constructor(songId, title, path, duration, bitrate, sampleRate, track, album, artist, genre, added, yearPublished, cbrvbr, rating, filedate) {
        this.songId = songId;
        this.title = title;
        this.path = path;
        this.duration = duration;
        this.bitrate = bitrate;
        this.sampleRate = sampleRate;
        this.track = track;
        this.album = album;
        this.artist = artist;
        this.genre = genre;
        this.added = added;
        this.yearPublished = yearPublished;
        this.cbrvbr = cbrvbr;
        this.rating = rating;
        this.filedate = filedate;
    }
}
class SongCollection {
    constructor(songs, description, paging, total) {
        this.songs = songs;
        this.description = description;
        this.paging = paging;
        this.total = total;
    }
}


/***/ }),

/***/ 3387:
/*!*************************************!*\
  !*** ./src/app/song/song.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SongModule": () => (/* binding */ SongModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _song_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./song-list.component */ 8412);
/* harmony import */ var _playlist_select_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist-select-dialog.component */ 1205);
/* harmony import */ var _song_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./song.service */ 6735);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ 1382);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);

















class SongModule {
}
SongModule.ɵfac = function SongModule_Factory(t) { return new (t || SongModule)(); };
SongModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SongModule });
SongModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [
        _song_service__WEBPACK_IMPORTED_MODULE_2__.SongService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__.MatPaginatorModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__.MatSortModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatTableModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SongModule, { declarations: [_song_list_component__WEBPACK_IMPORTED_MODULE_0__.SongListComponent,
        _playlist_select_dialog_component__WEBPACK_IMPORTED_MODULE_1__.PlaylistSelectDialogComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__.MatPaginatorModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_16__.MatTableModule], exports: [_song_list_component__WEBPACK_IMPORTED_MODULE_0__.SongListComponent] }); })();


/***/ }),

/***/ 6735:
/*!**************************************!*\
  !*** ./src/app/song/song.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SongService": () => (/* binding */ SongService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 3981);




class SongService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService {
    constructor(http) {
        super();
        this.http = http;
    }
    getSongs(uri, filter, paging) {
        let parameter = this.getPagingForUrl(paging);
        if (filter !== null && filter !== undefined && filter !== "") {
            if (parameter === "") {
                parameter = "?filter=" + filter;
            }
            else {
                parameter += "&filter=" + filter;
            }
        }
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + uri + parameter);
    }
    getAllSongs(filter, paging) {
        let parameter = this.getPagingForUrl(paging);
        if (filter !== null && filter !== undefined && filter !== "") {
            if (parameter === "") {
                parameter = "?filter=" + filter;
            }
            else {
                parameter += "&filter=" + filter;
            }
        }
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/song" + parameter);
    }
    getAllSongsOfAlbum(id, paging) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + id + "/songs" + this.getPagingForUrl(paging));
    }
    getAllSongsOfArtist(id, paging) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/artist/" + id + "/songs" + this.getPagingForUrl(paging));
    }
    getAllSongsOfPlaylist(id, paging) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + id + "/songs" + this.getPagingForUrl(paging));
    }
    getAllSongsOfYear(id, paging) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/info/year/" + id + "/songs" + this.getPagingForUrl(paging));
    }
    getAllSongsOfGenre(id, paging) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/info/genres/" + id + "/songs" + this.getPagingForUrl(paging));
    }
    getSong(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/song/" + id);
    }
    downloadAlbum(albumId) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/album/" + albumId + "/download", { responseType: "blob" });
    }
    downloadPlaylist(playlistId) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/playlist/" + playlistId + "/download", { responseType: "blob" });
    }
}
SongService.ɵfac = function SongService_Factory(t) { return new (t || SongService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
SongService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SongService, factory: SongService.ɵfac });


/***/ }),

/***/ 8851:
/*!***********************************************!*\
  !*** ./src/app/user/user-detail.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserDetailComponent": () => (/* binding */ UserDetailComponent)
/* harmony export */ });
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.model */ 2634);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ 834);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 4357);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 8267);













function UserDetailComponent_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserDetailComponent_button_27_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r1.deleteUser(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class UserDetailComponent {
    constructor(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.user = new _user_model__WEBPACK_IMPORTED_MODULE_0__.User("", "", "", "");
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (params.get('id') !== "new") {
                this.loadUser(params.get('id'));
            }
        });
    }
    resetFields() {
        if (this.user.id === "") {
            this.user = new _user_model__WEBPACK_IMPORTED_MODULE_0__.User("", "", "", "");
        }
        else {
            this.loadUser(this.user.id);
        }
    }
    loadUser(id) {
        this.userService.getUser(id).subscribe((user) => {
            this.user = user;
        });
    }
    saveUser() {
        this.userService.saveUser(this.user).subscribe(u => this.user = u);
    }
    deleteUser() {
        this.userService.deleteUser(this.user.id).subscribe(() => {
            this.router.navigate(["/user"]);
        });
    }
}
UserDetailComponent.ɵfac = function UserDetailComponent_Factory(t) { return new (t || UserDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService)); };
UserDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: UserDetailComponent, selectors: [["app-user-detail"]], decls: 32, vars: 4, consts: [[1, "user-form"], ["matInput", "", "placeholder", "Username", "name", "username", 3, "ngModel", "ngModelChange"], ["matInput", "", "placeholder", "EMail", "name", "email", 3, "ngModel", "ngModelChange"], ["placeholder", "Role", "name", "role", 3, "ngModel", "ngModelChange"], ["value", "user"], ["value", "admin"], ["value", "guest"], ["mat-button", "", 3, "click"], ["mat-button", "", 3, "click", 4, "ngIf"], ["mat-button", "", "routerLink", "/user"]], template: function UserDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Edit User");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function UserDetailComponent_Template_input_ngModelChange_7_listener($event) { return ctx.user.username = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function UserDetailComponent_Template_input_ngModelChange_9_listener($event) { return ctx.user.email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function UserDetailComponent_Template_mat_select_ngModelChange_11_listener($event) { return ctx.user.role = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "User");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Guest");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserDetailComponent_Template_button_click_19_listener() { return ctx.saveUser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "done");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserDetailComponent_Template_button_click_23_listener() { return ctx.resetFields(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "undo");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, UserDetailComponent_button_27_Template, 4, 0, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "arrow_back");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Userlist");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.user.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.user.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.user.role);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.user.id !== "");
    } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardContent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatOption, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink], styles: [".user-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.user-form[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.message[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtBQUNGIiwiZmlsZSI6InVzZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi51c2VyLWZvcm0+ICoge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm1lc3NhZ2Uge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 5230:
/*!*********************************************!*\
  !*** ./src/app/user/user-list.component.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserListComponent": () => (/* binding */ UserListComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1082);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var _user_datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.datasource */ 9133);
/* harmony import */ var _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/paging.model */ 8080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ 834);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);


















const _c0 = ["input"];
function UserListComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function UserListComponent_mat_header_cell_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-header-cell", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Username");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function UserListComponent_mat_cell_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", user_r12.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r12.username, " ");
} }
function UserListComponent_mat_header_cell_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-header-cell", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "EMail");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function UserListComponent_mat_cell_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r13.email, "");
} }
function UserListComponent_mat_header_cell_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-header-cell", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Role");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function UserListComponent_mat_cell_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r14.role, "");
} }
function UserListComponent_mat_header_row_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-header-row");
} }
function UserListComponent_mat_row_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-row");
} }
class UserListComponent {
    constructor(userService) {
        this.userService = userService;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 20, 50];
        this.total = 0;
        this.displayedColumns = ['username', 'email', 'role'];
    }
    ngOnInit() {
        if (localStorage.getItem("pageSize")) {
            this.pageSize = +localStorage.getItem("pageSize");
        }
        this.dataSource = new _user_datasource__WEBPACK_IMPORTED_MODULE_0__.UserDataSource(this.userService);
        this.dataSource.loadUsers("", new _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__.Paging(0, this.pageSize, "username", "asc"));
        this.dataSource.userTotalSubject.subscribe(total => {
            this.total = total;
        });
    }
    ngAfterViewInit() {
        // server-side search
        (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(this.input.nativeElement, 'keyup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(150), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => {
            this.paginator.pageIndex = 0;
            this.loadUsersPage();
        }))
            .subscribe();
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.merge)(this.sort.sortChange, this.paginator.page)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this.loadUsersPage()))
            .subscribe();
    }
    loadUsersPage() {
        localStorage.setItem("pageSize", "" + this.paginator.pageSize);
        this.dataSource.loadUsers(this.input.nativeElement.value, new _shared_paging_model__WEBPACK_IMPORTED_MODULE_1__.Paging(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction));
    }
}
UserListComponent.ɵfac = function UserListComponent_Factory(t) { return new (t || UserListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService)); };
UserListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: UserListComponent, selectors: [["app-user-list"]], viewQuery: function UserListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_9__.MatSort, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, decls: 28, vars: 10, consts: [[1, "user"], ["matInput", ""], ["input", ""], ["mat-button", "", "routerLink", "/user/new"], ["class", "spinner-container", 4, "ngIf"], ["matSort", "", 1, "users-table", 3, "dataSource"], ["usertable", ""], ["matColumnDef", "username"], ["mat-sort-header", "", 4, "matHeaderCellDef"], [4, "matCellDef"], ["matColumnDef", "email"], ["matColumnDef", "role"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], [3, "length", "pageSize", "pageSizeOptions", "showFirstLastButtons"], ["paginator", ""], [1, "spinner-container"], ["mat-sort-header", ""], ["mat-button", "", 3, "routerLink"]], template: function UserListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-placeholder");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Add new user");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, UserListComponent_div_11_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "mat-table", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](15, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, UserListComponent_mat_header_cell_16_Template, 2, 0, "mat-header-cell", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, UserListComponent_mat_cell_17_Template, 3, 2, "mat-cell", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](18, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, UserListComponent_mat_header_cell_19_Template, 2, 0, "mat-header-cell", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, UserListComponent_mat_cell_20_Template, 2, 1, "mat-cell", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](21, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, UserListComponent_mat_header_cell_22_Template, 2, 0, "mat-header-cell", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, UserListComponent_mat_cell_23_Template, 2, 1, "mat-cell", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, UserListComponent_mat_header_row_24_Template, 1, 0, "mat-header-row", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, UserListComponent_mat_row_25_Template, 1, 0, "mat-row", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "mat-paginator", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](12, 8, ctx.dataSource.loading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("length", ctx.total)("pageSize", ctx.pageSize)("pageSizeOptions", ctx.pageSizeOptions)("showFirstLastButtons", true);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatPlaceholder, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__.MatSort, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatRowDef, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__.MatPaginator, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__.MatSpinner, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatHeaderCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_9__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatCell, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterLinkWithHref, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatRow], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 591:
/*!*********************************************!*\
  !*** ./src/app/user/user-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRoutingModule": () => (/* binding */ UserRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../security/auth-guard.service */ 5579);
/* harmony import */ var _user_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-list.component */ 5230);
/* harmony import */ var _user_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-detail.component */ 8851);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);






const userRoutes = [
    { path: 'user', component: _user_list_component__WEBPACK_IMPORTED_MODULE_1__.UserListComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] },
    { path: 'user/:id', component: _user_detail_component__WEBPACK_IMPORTED_MODULE_2__.UserDetailComponent, canActivate: [_security_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuardService] }
];
class UserRoutingModule {
}
UserRoutingModule.ɵfac = function UserRoutingModule_Factory(t) { return new (t || UserRoutingModule)(); };
UserRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: UserRoutingModule });
UserRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(userRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](UserRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 9133:
/*!*****************************************!*\
  !*** ./src/app/user/user.datasource.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserDataSource": () => (/* binding */ UserDataSource)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8433);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 2489);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3951);
/* harmony import */ var _user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.model */ 2634);



class UserDataSource {
    constructor(userService) {
        this.userService = userService;
        this.usersSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
        this.userTotalSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(0);
        this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
        this.users = [];
        this.loading$ = this.loadingSubject.asObservable();
    }
    connect(collectionViewer) {
        return this.usersSubject.asObservable();
    }
    disconnect(collectionViewer) {
        this.usersSubject.complete();
        this.userTotalSubject.complete();
        this.loadingSubject.complete();
    }
    loadUsers(filter, paging) {
        this.loadingSubject.next(true);
        let usersObservable;
        usersObservable = this.userService.getUsers(filter, paging);
        usersObservable
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(new _user_model__WEBPACK_IMPORTED_MODULE_0__.UserCollection([], null, 0))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.finalize)(() => this.loadingSubject.next(false)))
            .subscribe(userCollection => {
            this.userTotalSubject.next(userCollection.total);
            this.usersSubject.next(userCollection.users);
            this.users = userCollection.users;
        });
    }
}


/***/ }),

/***/ 2634:
/*!************************************!*\
  !*** ./src/app/user/user.model.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User),
/* harmony export */   "UserCollection": () => (/* binding */ UserCollection)
/* harmony export */ });
class User {
    constructor(id, username, role, email) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.email = email;
    }
}
class UserCollection {
    constructor(users, paging, total) {
        this.users = users;
        this.paging = paging;
        this.total = total;
    }
}


/***/ }),

/***/ 3765:
/*!*************************************!*\
  !*** ./src/app/user/user.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserModule": () => (/* binding */ UserModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _user_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-list.component */ 5230);
/* harmony import */ var _user_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-detail.component */ 8851);
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ 834);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 6752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ 9372);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);


















class UserModule {
}
UserModule.ɵfac = function UserModule_Factory(t) { return new (t || UserModule)(); };
UserModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: UserModule });
UserModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinnerModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_15__.MatSelectModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSortModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatTableModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](UserModule, { declarations: [_user_list_component__WEBPACK_IMPORTED_MODULE_0__.UserListComponent,
        _user_detail_component__WEBPACK_IMPORTED_MODULE_1__.UserDetailComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormFieldModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_13__.MatPaginatorModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__.MatProgressSpinnerModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_15__.MatSelectModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_16__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_17__.MatTableModule], exports: [_user_list_component__WEBPACK_IMPORTED_MODULE_0__.UserListComponent] }); })();


/***/ }),

/***/ 834:
/*!**************************************!*\
  !*** ./src/app/user/user.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 8260);
/* harmony import */ var _shared_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/base.service */ 8135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 3981);




class UserService extends _shared_base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService {
    constructor(http) {
        super();
        this.http = http;
    }
    getUsers(filter, paging) {
        let parameter = this.getPagingForUrl(paging);
        if (filter !== null && filter !== undefined && filter !== "") {
            if (parameter === "") {
                parameter = "?filter=" + filter;
            }
            else {
                parameter += "&filter=" + filter;
            }
        }
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/user" + parameter);
    }
    getUser(id) {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/user/" + id);
    }
    saveUser(user) {
        if (user.id === null || user.id === "") {
            return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/user", user);
        }
        else {
            return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/user", user);
        }
    }
    deleteUser(id) {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.restserver + "/api/admin/user/" + id);
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
UserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac });


/***/ }),

/***/ 8260:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false,
    restserver: "http://localhost:8080"
};


/***/ }),

/***/ 271:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 4750);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 8260);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(271)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
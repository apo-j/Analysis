/**
 * Created by xyj on 05/11/2014.
 */
define.Class("deployment.PageLoadUtility", function (a) {
    var b = a;
    b.resources(["W.Utils"]), b.methods({
        definePageResource: function (a, b) {
            var c = this._getResourceIdFromPageID(a);
            if (!define.getDefinition("resource." + c)) {
                var d = "master" === a ? b.masterPage : _.find(b.pages, function (b) {
                    return b.pageId === a
                }).urls, e = _.map(d, function (a) {
                    return resource.url(a, this._getRequestMethod(a), this._shouldLoadOnce(a))
                }, this);
                define.resource(c).withUrls(e).withTrials(3).withTimeBetween(3e3)
            }
        }, getPageDataPromise: function (a) {
            var b = Q.defer(), c = this;
            return this._logPageRender_(a, "startData"), resource.getResourceValue(this._getResourceIdFromPageID(a), function (d) {
                c._logPageRender_(a, "endData"), b.resolve(d)
            }, function () {
                c._logPageRender_(a, "endData", "all load attempts failed"), b.reject(new Error("Failed to get json page " + a))
            }), b.promise
        }, getFirstPageId: function (a, b) {
            var c, d = this.resources.W.Utils.hash.getHashParts(), e = "zoom" === d.id ? d.extData.match("([^/]+)/([^/]+)")[1] : d.id;
            return c = e && _.contains(a, e) ? e : b && _.contains(a, b) ? b : _.first(a)
        }, _getResourceIdFromPageID: function (a) {
            return "pages." + a
        }, _isStaticPage: function (a) {
            return !~a.indexOf("archive.")
        }, _shouldLoadOnce: function (a) {
            return !!this._isStaticPage(a)
        }, _getRequestMethod: function (a) {
            return this._isStaticPage(a) ? "cors" : "jsonp"
        }, _logPageRender_: function (a, b, c) {
            deployStatus("pageLoad", {pageId: a, type: b, time: LOG.getSessionTime(), errorDesc: c})
        }
    })
}), define.bootstrapClass("deployment.ViewerDeploymentLogs", function () {
    function a(a) {
        if (!this.alreadyLoadedInPrev340 && (this.alreadyLoadedInPrev340 = W.Viewer.isSiteReady(), (!window.viewMode || "site" === window.viewMode) && LOG.isThisSiteInEventSampleRatio(wixEvents.LOAD_PAGE_DATA.sampleRatio))) {
            var e = -1 !== document.referrer.indexOf("editor.wix.com/html/editor"), i = {
                isFromEditor: e,
                isMobile: W.Config.mobileConfig ? W.Config.mobileConfig.isMobileOrTablet() : "unknown",
                isLoaded: W.Viewer.isSiteReady(),
                classRepoIsReadyTime: deployStatus.classRepoIsReadyTime,
                experimentsIsReadyTime: deployStatus.experimentsIsReadyTime
            };
            b(i), c(i), d(i), g(i), f(i), LOG.reportEvent(wixEvents.LOAD_PAGE_DATA, {
                c1: JSON.stringify(i),
                c2: JSON.stringify(h()),
                i1: a
            })
        }
    }

    function b(a) {
        var b = deployStatus.logs.loadStaticHtml || [], c = -1, d = -1, e = -1, f = null, g = !1;
        b.length > 0 && "start loading" === b[0].step && (d = b[0].time), b.length > 1 && "end loading" === b[1].step && (c = b[1].time, f = b[1].errorDesc), b.length > 2 && "dom ready" === b[2].step && (e = b[2].time, g = b[2].hasGalleries), a.staticHtml = {
            start: d,
            endLoading: c,
            done: e
        }, e > 0 && (a.staticHtml.hasTPAGalleries = g), f && (a.staticHtml.hadErrors = !0)
    }

    function c(a) {
        var b = deployStatus.logs.viewerRender || [], c = -1, d = -1, e = -1;
        b.length > 1 && "site ready" === b[1].step && (c = b[1].time, e = b[1].time), b.length > 0 && (d = b[0].time), a.render = {
            start: d,
            done: e
        }, a.siteReadyTime = c
    }

    function d(a) {
        var b = deployStatus.logs.pageLoad || [], c = e(b), d = c.pagesReport, f = c.startTime;
        a.pages = {start: f, pages: d}
    }

    function e(a) {
        for (var b = {}, c = -1, d = 0; d < a.length; ++d) {
            var e = a[d], f = e.pageId, g = b[f] = b[f] || {};
            if (g.steps = g.steps || {}, !g.error && !g.steps[e.type] && ("startData" === e.type && (-1 === c || e.time < c) && (c = e.time), g.steps[e.type] = e.time, g.time = e.time, g.step = e.type, e.errorDesc)) {
                var h = "string" == typeof e.errorDesc ? e.errorDesc : e.errorDesc.toString();
                g.error = h.substr(0, 50)
            }
        }
        return {pagesReport: b, startTime: c}
    }

    function f(a) {
        a.isEcom = !1;
        var b = deployStatus.logs.wixappsLoad || [];
        if (b.length > 1 && "loading ecom" == b[1].step && (a.isEcom = !0), b.length) {
            a.wixapps = {start: b[0].time, done: _.last(b).time, phases: {}};
            for (var c = 0, d = 0, e = b.length; e > d; d++)a.wixapps.phases[d] = b[d].time - c, c = b[d].time
        }
    }

    function g(a) {
        var b = deployStatus.logs.phases || [], c = -1;
        b.length > 0 && (c = _.last(b).time);
        for (var d = {}, e = 0, f = 0; f < b.length; f++)d[f] = b[f].time - e, e = b[f].time;
        a.deployment = {start: 0, done: c, phases: d}
    }

    function h() {
        function a(a, b) {
            return a == b ? 0 : Number(a) > Number(b) ? -1 : 1
        }

        for (var b, c = {}, d = Object.keys(deployStatus.files), e = 0; e < d.length; e++)b = deployStatus.files[d[e]].end - deployStatus.files[d[e]].start, c[b] = d[e];
        var f = Object.keys(c);
        f.reverse(a);
        for (var g, h, i = f.slice(0, 10), j = {}, e = 0; e < i.length; e++)g = c[i[e]].split("/"), h = /index\.json/.test(g[g.length - 1]) || /index\.debug\.json/.test(g[g.length - 1]) ? g[g.length - 3] : g[g.length - 1], h = encodeURIComponent(h), j[h] = i[e];
        return j
    }

    function i() {
        function a(a, b) {
            c[b].length < e && c[b].push(a)
        }

        if (window._imagePerformance) {
            for (var b = {_100k: 0, _200k: 0, _300k: 0, _400k: 0, _500k: 0, _over500k: 0}, c = {
                _100k: [],
                _200k: [],
                _300k: [],
                _400k: [],
                _500k: [],
                _over500k: []
            }, d = 0, e = 3, f = 0; f < window._imagePerformance.timing.length; f++) {
                var g = window._imagePerformance.timing[f], h = g.size;
                1e5 > h ? (b._100k++, a(g, "_100k")) : 2e5 > h ? (b._200k++, a(g, "_200k")) : 3e5 > h ? (b._300k++, a(g, "_300k")) : 4e5 > h ? (b._400k++, a(g, "_400k")) : 5e5 > h ? (b._500k++, a(g, "_500k")) : (b._over500k++, a(g, "_over500k")), g.hadError && d++
            }
            var i = {
                loading: window._imagePerformance.started - window._imagePerformance.timing.length,
                imagesBySize: b,
                imagesSamples: c,
                errors: d
            };
            LOG.reportEvent(wixEvents.LOAD_IMAGES_DATA, {c1: JSON.stringify(i)})
        }
    }

    return {sendPageLoadingBI340: a, getPagesReportForBI340: e, sendImageLoadingBI341: i}
}), function () {
    function a(a) {
        for (var b, c = [], d = /[&?]debugArtifacts?=([^&]+)/gi; b = d.exec(a);) {
            var e = decodeURIComponent(b[1]);
            c = c.concat(e.split(","))
        }
        return c = c.map(function (a) {
            var b = a.toLowerCase().replace(/\s/g, "");
            return "web" === b && (b = "wysiwyg"), b
        }).filter(function (a) {
            return a
        }), c.reduce(function (a, b) {
            return a[b] = !0, a
        }, {})
    }

    function b(a) {
        var b = {};
        for (var c in a)b[c.toLowerCase()] = a[c].toLowerCase();
        return b
    }

    function c() {
        for (var a = window.location.search.toLowerCase().replace("?", ""), b = a.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].split("=");
            if ("experiment" == d[0]) {
                var e = d[1].split(":");
                window.rendererModel.runningExperiments[e[0]] = e[1] || "new"
            }
        }
    }

    function d() {
        window.rendererModel.runningExperiments = b(window.rendererModel.runningExperiments), c();
        var a = ["common", "viewer"];
        "preview" === window.viewMode && a.push("preview");
        var d = rendererModel.runningExperiments;
        for (var e in d)a.push(e.toLowerCase() + ":" + d[e].toLowerCase());
        return /[?&]jasminespec([&=]|$)/i.test(window.location.search) && a.push("integration-tests"), a
    }

    define.resource("tags", d()), define.resource("mode", {
        debug: "debug" === rendererModel.debugMode,
        test: !1
    }), define.resource("debugModeArtifacts", a(window.location.search)), define.deployment("wysiwyg.deployment.PrepViewer", function (a) {
        a.atPhase(PHASES.BOOTSTRAP, function () {
            window.wixData && resource.getResources(["dataFixer"], function (a) {
                var b = a.dataFixer.fix(window.wixData);
                this.define.dataItem.multi(b.document_data), this.define.dataPropertyItem.multi(b.component_properties), this.define.dataThemeItem.multi(b.theme_data)
            })
        }), a.atPhase(PHASES.MANAGERS, function (a) {
            a.createClassInstance("W.Layout", "wysiwyg.viewer.managers.LayoutManager"), a.createClassInstance("W.Viewer", "wysiwyg.viewer.managers.WViewManager"), a.createClassInstance("W.SiteMembers", "wysiwyg.viewer.managers.SiteMembersManager"), a.createClassInstance("W.MessagesController", "wysiwyg.viewer.utils.MessageViewController"), a.createClassInstance("W.Actions", "wysiwyg.viewer.managers.ActionsManager"), W.isExperimentOpen("SocialActivity") && a.createClassInstance("W.SocialActivityDataManager", "wysiwyg.viewer.managers.SocialActivityDataManager")
        }), a.atPhase(PHASES.POST_DEPLOY, function (a) {
            if ("preview" === window.viewMode)return null;
            if (window.siteHeader && window.rendererModel && "UGC" === rendererModel.documentType) {
                var b = a.getClassManagerInstance();
                b.getClass("core.utils.BeatStatisticsAndKeepAlive", function (a) {
                    window.BeatStatisticsAndKeepAliveInstance = new a("hve", siteHeader.id, $$("title")[0].innerHTML, siteHeader.documentType, !1, rendererModel.metaSiteId, function () {
                    })
                })
            }
        })
    })
}(), resource.getResources(["mode", "debugModeArtifacts", "scriptLoader"], function (a) {
    window.getIndexTopology.call(a, {
        debug: a.mode.debug,
        debugModeArtifacts: a.debugModeArtifacts
    }, {
        aliases: {web: "wysiwyg"},
        exclude: {
            langs: !0,
            mock: !0,
            sitemembers: !0,
            ecommerce: W.isExperimentOpen("EcomArtifactDeploy") ? void 0 : !0,
            automation: W.isExperimentOpen("it") ? void 0 : !0,
            editormenu: !0
        },
        baseUrls: {external_apis: ""},
        "main-artifacts": ["ck-editor", "bootstrap", "sitemembers", "ecommerce", "langs", "wixapps", "core", "tpa", "skins", "wysiwyg", "html-test-framework", "mock", "automation"]
    }, function (b) {
        define.resource("topology", b.all), a.mode.test && "function" == typeof getTestManifestFromTheSpecRunner && b.manifestsUrls.unshift(getTestManifestFromTheSpecRunner()), define.resource("manifestsUrls", b.manifestsUrls), a.scriptLoader.loadAllIndexes(b.manifestsUrls, function () {
            define.resource("deployment", define.createBootstrapClassInstance("bootstrap.bootstrap.deploy.Deploy").init(window))
        })
    })
}), define.deployment("core.deployment.DeployViewer", function (a) {
    function b() {
        W.Classes.getClass("external_apis.GoogleTagManager", function (a) {
            new a("viewer")
        }), window.BeatStatisticsAndKeepAliveInstance && window.BeatStatisticsAndKeepAliveInstance.sendBeat(), W.Experiments.isDeployed({verifypremium: "New"}) && W.Classes.getClass("wysiwyg.viewer.VerifyPremium", function (a) {
            var b = new a;
            b.verify()
        }), W.Experiments.isDeployed({ClientSideUserGUIDCookie: "New"}) && "WixSite" == rendererModel.documentType && resource.getResourceValue("scriptLoader", function (a) {
            a.loadScript({url: "http://static.wix.com/services/third-party/misc/ClientSideUserGUIDCookie.js"}, {})
        });
        var a = W.Utils.getQueryStringParamsAsObject(), b = function () {
            var a = new Element("div", {id: "reviewsContainer"});
            document.body.appendChild(a), W.Components.createComponent("wysiwyg.previeweditorcommon.components.SiteFeedbackPanel", "wysiwyg.previeweditorcommon.SiteFeedbackPanelSkin", null, null, function (b) {
                b.getViewNode().insertInto(a)
            }, function (a) {
                a.showQuickTour()
            })
        };
        "true" === a.feedback && W.Resources.loadLanguageBundle("FEEDBACK_REVIEW", b)
    }

    var c = define.getBootstrapClass("deployment.ViewerDeploymentLogs");
    setTimeout(function () {
        c.sendPageLoadingBI340(10), c.sendImageLoadingBI341()
    }, 1e4), setTimeout(function () {
        c.sendPageLoadingBI340(20)
    }, 2e4), setTimeout(function () {
        c.sendPageLoadingBI340(30)
    }, 3e4), a.atPhase(PHASES.BOOTSTRAP, function () {
        for (var a = document.querySelectorAll("head *"), b = document.querySelectorAll("body *"), c = 0; c < a.length; c++)a[c].serverGenerated = !0, a[c].setAttribute("serverGenerated", !0);
        for (c = 0; c < b.length; c++)b[c].serverGenerated = !0, b[c].setAttribute("serverGenerated", !0)
    }), a.atPhase(PHASES.INIT, function () {
        function a(a, e) {
            var f = c(a), g = b(f);
            g && g[f.componentName] && (e = d(e, g[f.componentName])), W.Experiments.applyExperiments("Editor." + a, e, "ExperimentComponentPlugin")
        }

        function b(a) {
            var b;
            try {
                b = this.define.getDefinition("component", "Editor." + a.componentNamespace)
            } catch (c) {
                b = null
            }
            return b
        }

        function c(a) {
            var b = {}, c = a.lastIndexOf(".");
            return b.componentNamespace = a.substring(0, c), b.componentName = a.substring(c + 1), b
        }

        function d(a, b) {
            var c = this.define.createBootstrapClassInstance("bootstrap.managers.experiments.ExperimentStrategy"), d = this.define.createBootstrapClassInstance("core.managers.component.ComponentDefinition"), e = a;
            "function" == typeof a && (e = new d, a(e));
            var f = d;
            return b(f, c), e.resources(c._mergeField_(e._resources_, f._resources_)), e.binds(c._mergeField_(e._binds_, f._binds_)), e.traits(f._traits_ || e._traits_), e.utilize(c._mergeField_(e._imports_, f._imports_)), e.statics(c._mergeObjects_(e._statics_, f._statics_)), e.fields(c._mergeObjects_(e._fields_, f._fields_)), e.methods(c._mergeObjects_(e._methods_, f._methods_)), e.states(c._mergeField_(e._states_, f._states_)), e.panel(f._panel_), e.styles(f._styles_), e.helpIds(f._helpIds_), e.toolTips(f._toolTips_), e
        }

        function e() {
            try {
                if ("preview" !== window.viewMode)return;
                if (!(window.wixData && wixData.document_data && wixData.document_data.MAIN_MENU && wixData.document_data.MAIN_MENU.items))return;
                var a = wixData.document_data.MAIN_MENU.items, b = $("SITE_PAGES");
                if (!b)return;
                for (var c = 0; c < a.length; c++)if (a[c].refId && f(a[c].refId, b), a[c].items)for (var d = 0; d < a[c].items.length; d++)a[c].items[d].refId && f(a[c].items[d].refId, b)
            } catch (e) {
            }
        }

        function f(a, b) {
            try {
                var c = a.substr(1);
                if (null == b.getElementById(c)) {
                    var d = new Element("div", {
                        id: c,
                        dataquery: a,
                        comp: "mobile.core.components.Page",
                        styleid: "p1",
                        "class": "initHidden",
                        x: "0",
                        y: "0",
                        width: "980",
                        height: "600",
                        skin: "wysiwyg.viewer.skins.page.BasicPageSkin"
                    });
                    b.appendChild(d), wixData.document_data[c].hidePage = !0, LOG.reportError(wixErrors.RESTORED_BLANK_PAGE_WHERE_MISSING_PAGE_DATA)
                }
            } catch (e) {
            }
        }

        W.ComponentLifecycle.setComponentErrorHandler(function (a, b, c) {
            "use strict";
            var d = a.component.$className;
            LOG.reportError(wixErrors.COMPONENT_ERROR, d, c, b.stack)
        }), W.Config.env.$isEditorViewerFrame && W.Components.setComponentDefinitionModifier(function (b, c) {
            a(b, c)
        }), resource.getResourceValue("status.structure.loaded", function (a) {
            if (!a)throw new Error("Site structure failed to load");
            e(), W.Viewer.initiateSite()
        })
    }), a.atPhase(PHASES.POST_DEPLOY, function () {
        W.Viewer.addEvent("SiteReady", function () {
            W.Utils.callLater(b)
        })
    })
});
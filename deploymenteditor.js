/**
 * Created by xyj on 05/11/2014.
 */
!function () {
    function a(a) {
        for (var b, c = [], d = /[&?]debugArtifacts?=([^&]+)/gi; b = d.exec(a);) {
            var e = decodeURIComponent(b[1]);
            c = c.concat(e.split(","))
        }
        return c = c.map(function (a) {
            var b = a.toLowerCase().replace(/\s/g, "");
            return"web" === b && (b = "wysiwyg"), b
        }).filter(function (a) {
            return a
        }), c.reduce(function (a, b) {
            return a[b] = !0, a
        }, {})
    }

    //convert the properties of an object and each of its value to lower case
    function b(a) {
        var b = {};
        for (var c in a)b[c.toLowerCase()] = a[c].toLowerCase();
        return b
    }

    function c() {//parse query string and get experiment features
        for (var a = window.location.search.toLowerCase().replace("?", ""), b = a.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].split("=");
            if ("experiment" == d[0]) {
                var e = d[1].split(":");
                window.editorModel.runningExperiments[e[0]] = e[1] || "new"
            }
        }
    }

    function d() {
        window.editorModel.runningExperiments = b(window.editorModel.runningExperiments), c();
        var a = ["common", "editor"], d = editorModel.runningExperiments;
        for (var e in d)a.push(e.toLowerCase() + ":" + d[e].toLowerCase());
        return/[?&]jasminespec([&=]|$)/i.test(window.location.search) && a.push("integration-tests"), a
    }

    0 == window.location.hash.indexOf("#REDIRECTTO") && (window.enableNavigationConfirmation = !1, window.location = window.location.hash.replace(/^#REDIRECTTO/, ""));
    var e = /[?&]debugArtifacts?\b/i.test(window.location.search);
    ("debug" === editorModel.mode || e) && (editorModel.runningExperiments.dev = "New"), define.resource("tags", d()), define.resource("mode", {debug: "debug" === editorModel.mode, debugArtifacts: e, test: !1}), define.resource("debugModeArtifacts", a(window.location.search)), resource.getResourceValue("mode", function () {
        function a() {
            return editorModel && "unit_test" === editorModel.mode
        }

        function b() {
            var b = a() ? "0" : "100%", d = document.createElement("div");
            return d.id = "EDITOR_STRUCTURE", d.innerHTML = '<a href="template_page"></a><div skinPart="sitePages" id="SITE_PAGES"></div><div id="live-preview-iframe-wrapper"><iframe id="live-preview-iframe" name="live-preview-iframe" width="100%" height="' + b + '" frameborder="0" src="' + c() + '"></iframe></div><div comp="wysiwyg.editor.components.EditorPresenter" skin="wysiwyg.editor.skins.EditorPresenterSkin" id="editorUI"></div>', document.body.appendChild(d), d
        }

        function c() {
            if (a())return"";
            var b = window.editorModel.previewUrl, c = "&isEdited=true";
            return c += "debug" === editorModel.mode ? "&mode=debug" : "", c += "&" + d(location.search, ["editorSessionId", "metaSiteId"]), c += "&lang=" + (window.wixEditorLangauge || window.editorModel.languageCode || "en"), b + c
        }

        function d(a, b) {
            if (!b || 0 === b.length)return a;
            a = f(a);
            var c = a.split("&"), d = e(c, b);
            return d.join("&")
        }

        function e(a, b) {
            var c = [];
            if (!a)return c;
            if (!b)return a;
            for (var d = 0; d < a.length; d++) {
                var e = a[d], f = e.split("=")[0];
                f && !g(b, f) && c.push(e)
            }
            return c
        }

        function f(a) {
            return a && a.length > 0 && 0 === a.indexOf("?") && (a = a.substr(1, a.length)), a
        }

        function g(a, b) {
            if (a && a.length > 0 && b)for (var c = 0; c < a.length; c++)if (a[c] === b)return!0;
            return!1
        }

        b()
    }), define.deployment("wysiwyg.deployment.PrepEditor", function (a) {
        a.atPhase(PHASES.BOOTSTRAP, function () {
            define.dataThemeItem("THEME_DATA", {type: "Theme", properties: {CONTACT_DIRECTORY: {type: "themeUrl", value: "editorIcons/links"}, NETWORKS_DIRECTORY: {type: "themeUrl", value: "editorIcons/links"}, EXTERNAL_LINKS_DIRECTORY: {type: "themeUrl", value: "editorIcons/links"}, PAGES_DIRECTORY: {type: "themeUrl", value: "editorIcons/links"}, THEME_DIRECTORY: {type: "themeUrl", value: "editor_mobile"}, WEB_THEME_DIRECTORY: {type: "webThemeUrl", value: "editor_web"}}})
        }), a.atPhase(PHASES.MANAGERS, function (a) {
            a.createClassInstance("W.Preview", "wysiwyg.editor.managers.WPreviewManager"), a.createClassInstance("W.Editor", "wysiwyg.editor.managers.editormanager.WEditorManager"), a.createClassInstance("W.EditorDialogs", "wysiwyg.editor.managers.WDialogManager"), a.createClassInstance("W.ServerFacade", "wysiwyg.editor.managers.serverfacade.ServerFacade"), a.createClassInstance("W.ClipBoard", "wysiwyg.editor.managers.WClipBoard"), a.createClassInstance("W.AlignmentTools", "wysiwyg.editor.managers.WAlignmentTools"), a.createClassInstance("W.CompSerializer", "wysiwyg.editor.managers.WComponentSerializer"), a.createClassInstance("W.CompDeserializer", "wysiwyg.editor.managers.componentdeserializer.WComponentDeserializer"), a.createClassInstance("W.UndoRedoManager", "wysiwyg.editor.managers.UndoRedoManager"), a.createClassInstance("W.AppStoreManager", "tpa.editor.managers.AppStoreManager"), a.createClassInstance("W.SMEditor", "wysiwyg.editor.managers.SMEditorManager"), a.createClassInstance("W.BackgroundManager", "wysiwyg.editor.managers.background.BackgroundManager"), a.createClassInstance("W.ScrollHandler", "wysiwyg.editor.utils.ScrollHandler"), W.Experiments.isDeployed("CloudPanel") && a.createClassInstance("W.CloudManager", "wysiwyg.editor.managers.WCloudManager")
        }), a.atPhase(PHASES.POST_DEPLOY, function () {
            var a = Date.now();
            resource.getResourceValue("scriptLoader", function (b) {
                var c = "3.1.0.243", d = "http://static.parastorage.com/services/third-party/aviary/%version%/js/feather.js".replace("%version%", c);
                deployStatus("Aviary", "Aviary started to load"), b.loadResource({url: d, noBlob: !0}, {onFailed: function () {
                    LOG.reportError(wixErrors.AVIARY_NOT_LOADED, "BootstrapEditor", "PostDeploy", {i1: Date.now() - a}), define.resource("Aviary", null)
                }, onLoad: function () {
                    define.resource("Aviary", window.Aviary), deployStatus("Aviary", "Aviary Loaded Successfully " + Date.now() - a)
                }})
            })
        })
    })
}(), resource.getResources(["mode", "debugModeArtifacts", "scriptLoader"], function (a) {
    window.getIndexTopology.call(a, {debug: a.mode.debug, debugModeArtifacts: a.debugModeArtifacts}, {aliases: {web: "wysiwyg"}, exclude: {langs: !0, mock: !0, sitemembers: !0, ecommerce: W.isExperimentOpen("EcomArtifactDeploy") ? void 0 : !0, automation: W.isExperimentOpen("it") ? void 0 : !0, editormenu: !0}, baseUrls: {external_apis: ""}, "main-artifacts": ["ck-editor", "bootstrap", "sitemembers", "ecommerce", "langs", "wixapps", "core", "tpa", "skins", "wysiwyg", "html-test-framework", "mock", "automation"]}, function (b) {
        define.resource("topology", b.all), a.mode.test && "function" == typeof getTestManifestFromTheSpecRunner && b.manifestsUrls.unshift(getTestManifestFromTheSpecRunner()), define.resource("manifestsUrls", b.manifestsUrls), a.scriptLoader.loadAllIndexes(b.manifestsUrls, function () {
            define.resource("deployment", define.createBootstrapClassInstance("bootstrap.bootstrap.deploy.Deploy").init(window))
        })
    })
}), define.deployment("core.deployment.Wysiwyg-Editor", function (a) {
    a.atPhase(PHASES.UTILS, function () {
        function a() {
            this._hasBootstrapped = !1, this._angularLoadingPromise = Q.defer(), window.W.AngularLoader = window.W.AngularLoader || {}, window.W.AngularLoader.angularLoadingPromise = this._angularLoadingPromise
        }

        var b = {_modulesToRegister: [], getAngularLoadingDeferredPromise: function () {
            return this._angularLoadingPromise
        }, bootstrap: function (a) {
            this._hasBootstrapped || (this.execute(a), this._hasBootstrapped = !0)
        }, registerAdditionalModule: function (a, b) {
            this._modulesToRegister.push({name: a, dependencies: b})
        }, getAdditionalModules: function () {
            return this._modulesToRegister
        }, compileElement: function (a, b) {
            var c = angular.element(document.id("editorUI")).injector(), d = c.get("$compile"), e = c.get("$rootScope").$new();
            _.assign(e, b), d(angular.element(a))(e)
        }, executeExperiment: function (a, b) {
            W.Experiments.isDeployed(a) && this.execute(b)
        }, execute: function (a) {
            return this._angularLoadingPromise.promise.then(a)
        }};
        a.prototype = b;
        var c = new a;
        window.W.AngularLoader = c, window.W.AngularManager = window.W.AngularLoader
    }), a.atPhase(PHASES.INIT, function () {
        function a(a) {
            Modernizr.csstransitions && "ready" === a && !g ? (f.className = "fade-out", g = !0, setTimeout(function () {
                f.className = "ready"
            }, h)) : f.className = a
        }

        function b(a) {
            LOG.reportEvent(wixEvents.SET_SITE_CALLED), W.Editor.setEditor(document.id("EDITOR_STRUCTURE"), a)
        }

        function c() {
            W.Data.getDataByQuery("#EDITOR_STRUCTURE", b)
        }

        function d() {
            W.Classes.getClass("wysiwyg.common.utils.OpenPanelByQuery", function (a) {
                new a
            })
        }

        function e() {
            W.Classes.getClass("external_apis.GoogleTagManager", function (a) {
                new a
            }), W.Classes.getClass("external_apis.FacebookPixelScript", function (a) {
                new a
            }), resource.getResourceValue("scriptLoader", function (a) {
                a.loadScript({url: "http://static.wix.com/services/third-party/misc/ConsoleRecruitment-0.0.1.js"}, {})
            })
        }

        var f = $("editor_preloader"), g = !1, h = 300;
        window.setPreloaderState = a, a("editorLoading"), resource.getResourceValue("W.Resources", function (a) {
            a.loadLanguageBundle("EDITOR_LANGUAGE", c)
        }), W.Editor.addEvent(Constants.EditorEvents.EDITOR_READY, d), W.Editor.addEvent(W.Editor.EDITOR_LOAD_FINISHED, function () {
            W.Utils.callLater(e)
        })
    })
});
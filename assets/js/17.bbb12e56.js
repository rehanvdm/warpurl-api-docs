(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{372:function(t,s,a){"use strict";a.r(s);var e=a(44),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"user"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#user"}},[t._v("#")]),t._v(" User")]),t._v(" "),a("p",[t._v("The secondary "),a("em",[t._v("container")]),t._v(", every model (except client) can only belong to a single user.")]),t._v(" "),a("p",[t._v("Consult the <"),a("RouterLink",{attrs:{to:"/api/model.html#user"}},[t._v("model:user")]),t._v("> for general property/field information.")],1),t._v(" "),a("p",[t._v("All client requests ("),a("code",[t._v("/user/*")]),t._v(") need to specify the Auth headers below as described in "),a("RouterLink",{attrs:{to:"/api/#authentication"}},[t._v("General")])],1),t._v(" "),a("h4",{attrs:{id:"headers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#headers"}},[t._v("#")]),t._v(" HEADERS")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x-api-key"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <API KEY>"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Authorization"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <JWT ID Token>\n")])])]),a("hr"),t._v(" "),a("h4",{attrs:{id:"all-requests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#all-requests"}},[t._v("#")]),t._v(" ALL REQUESTS")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#find"}},[t._v("Find")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"find"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#find"}},[t._v("#")]),t._v(" Find")]),t._v(" "),a("p",[t._v("Find a User.")]),t._v(" "),a("h4",{attrs:{id:"request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[t._v("#")]),t._v(" REQUEST")]),t._v(" "),a("h4",{attrs:{id:"path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#path"}},[t._v("#")]),t._v(" Path")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("/user/find\n")])])]),a("h4",{attrs:{id:"authorization-required"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#authorization-required"}},[t._v("#")]),t._v(" Authorization Required")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("root, admin, user\n")])])]),a("h4",{attrs:{id:"body"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#body"}},[t._v("#")]),t._v(" Body")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"control"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"client_id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"#clt#6be8d279-591a-4210-922e-d6caa605b063"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" RESPONSE")]),t._v(" "),a("h4",{attrs:{id:"success"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#success"}},[t._v("#")]),t._v(" Success")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"control"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ResponseCode"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"TraceID"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"11648023-1376-4da8-806e-11999c1c519f"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"Build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"eb511f1"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"data"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" <model"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("user>\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);
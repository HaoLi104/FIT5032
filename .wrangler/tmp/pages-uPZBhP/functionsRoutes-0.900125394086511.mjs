import { onRequestGet as __api_public_articles_js_onRequestGet } from "C:\\Users\\Administrator\\Desktop\\fit5032\\FIT5032\\functions\\api\\public\\articles.js"
import { onRequestGet as __api_public_events_js_onRequestGet } from "C:\\Users\\Administrator\\Desktop\\fit5032\\FIT5032\\functions\\api\\public\\events.js"
import { onRequestPost as __api_bulk_email_js_onRequestPost } from "C:\\Users\\Administrator\\Desktop\\fit5032\\FIT5032\\functions\\api\\bulk-email.js"
import { onRequestPost as __api_send_email_js_onRequestPost } from "C:\\Users\\Administrator\\Desktop\\fit5032\\FIT5032\\functions\\api\\send-email.js"

export const routes = [
    {
      routePath: "/api/public/articles",
      mountPath: "/api/public",
      method: "GET",
      middlewares: [],
      modules: [__api_public_articles_js_onRequestGet],
    },
  {
      routePath: "/api/public/events",
      mountPath: "/api/public",
      method: "GET",
      middlewares: [],
      modules: [__api_public_events_js_onRequestGet],
    },
  {
      routePath: "/api/bulk-email",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_bulk_email_js_onRequestPost],
    },
  {
      routePath: "/api/send-email",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_send_email_js_onRequestPost],
    },
  ]
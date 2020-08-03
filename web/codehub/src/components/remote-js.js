export default {
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrjs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
};
//<remote-js src="https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js"></remote-js>
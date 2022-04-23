window.Widget = { 
  idContainer: "widget-container", 
  UrlWidget: "http://localhost:3000/",

  init: async (id = this.idContainer, { width, height }, { phone }) => { 

    if (document.getElementById(id)) { 
      try { 
        const widget = document.createElement("iframe");
        widget.setAttribute("src", this.Widget.UrlWidget + "?phone=" + phone );
        widget.setAttribute("frameborder", "1");
        widget.setAttribute("scrolling", "no");
        widget.setAttribute("width", width);
        widget.setAttribute("height", height);
        document.getElementById(id).append(widget);
      } catch(error) {
        throw new Error("[ВНИМАНИЕ]: Произошла ошибка при инициализации виджета");
      };
    } else { 
      console.log(`[ВНИМАНИЕ]: Блок для инициализации виджета не найден (id=${id})`); 
    };
    
  }, 
}; 

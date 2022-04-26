const Widget = ( function() {
  const URL = "http://localhost:3000/";

  function widgetParametrs (widgetSettings) {
    let params = "?";
    params += "phone=" + widgetSettings.phone;
    // ...params | widgetSettings

    return URL + params;
  };

  return { 
    init: async (frameSettings, widgetSettings) => { 
  
      if (document.getElementById(frameSettings.id)) { 
        try { 

          const FrameContainer = document.getElementById(frameSettings.id);

          const Frame = document.createElement("iframe");
          Frame.setAttribute("frameborder", "0");
          Frame.setAttribute("scrolling", "no");
          Frame.setAttribute("width", frameSettings.style.width);
          Frame.setAttribute("height", frameSettings.style.height);
          // ...setAttribute | frameStyle;

          Frame.setAttribute("src", widgetParametrs(widgetSettings));

          FrameContainer.append(Frame);
          
        } catch(error) {
          throw new Error("[ВНИМАНИЕ]: Произошла ошибка при инициализации виджета");
        };
      } else { 
        throw new Error(`[ВНИМАНИЕ]: Блок для инициализации виджета не найден (id=${id})`);
      };
      
    }, 
  }
}());
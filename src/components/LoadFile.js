export const loadScript = (src) => {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.body.appendChild(tag);
  };

  export const loadStyle = (href) => {
    var tag = document.createElement('link');
    tag.type = "text/css";
    tag.rel = "stylesheet";
    tag.href = href;
    document.body.appendChild(tag);
  }; 
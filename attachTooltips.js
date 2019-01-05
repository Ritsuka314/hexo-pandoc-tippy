window.onload = function (ev) {
    let pattern = /^(fnref)([\d]+)$/;
    let base = {html: e1 => '#tooltip' + pattern.exec(e1.id)[2]}
    let extra = %s
    
    tippy('a[id^="fnref"]',
          Object.assign({},base, extra))
};
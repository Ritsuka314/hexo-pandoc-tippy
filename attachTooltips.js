window.onload = function (ev) {
    let pattern = /^(fnref)(.+)$/;
    let base = {html: e1 => '#tooltip' + pattern.exec(e1.id)[2].replace(/\./g, "\\.")}
    let extra = %s
    
    tippy('a[id^="fnref"]',
          Object.assign({},base, extra))
};
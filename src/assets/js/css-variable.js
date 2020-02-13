//Color     HEX	    GB
// primary  #0275d8	rgb(2, 117, 216)
// success  #5cb85c	rgb(92, 184, 92)
// info     #5bc0de	rgb(91, 192, 222)
// warning  #f0ad4e	rgb(240, 173, 78)
// danger   #d9534f	rgb(217, 83, 79)
// dark     #292b2c	rgb(41, 43, 44)
// default  #f7f7f7	rgb(247, 247, 247)

let themeDefault = '#292b2c'
let themeTextColorDefault = '#f7f7f7';
let themeTextColorInverse = '#292b2c';
let themeHeaderTextColorDefault = '#f7f7f7';
document.documentElement.style.setProperty('--theme-color', themeDefault);
document.documentElement.style.setProperty('--theme-text-color-default', themeTextColorDefault);
document.documentElement.style.setProperty('--theme-text-color-inverse', themeTextColorInverse);
document.documentElement.style.setProperty('--theme-header-text-color', themeHeaderTextColorDefault);
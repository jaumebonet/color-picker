// Create a new color picker instance
// https://rakujira.jp/projects/iro/docs/guide.html#Getting-Started
var example = new iro.ColorPicker(".wrapper", {
  // color picker options
  // Option guide: https://rakujira.jp/projects/iro/docs/guide.html#Color-Picker-Options
  width: 350,
  height: 350,
  color: {r: 255, g: 0, b: 0},
  anticlockwise: true,
  borderWidth: 1,
  borderColor: "#fff",
  // Dynamic CSS guide: https://rakujira.jp/projects/iro/docs/guide.html#Dynamic-CSS
  css: {
    "#swatch": {
      "background-color": "$color"
    }
  }
});

function ryg2Str(color) {
  var ryg = rgb2ryb([color.rgb.r, color.rgb.g, color.rgb.b])
  return "ryb" + (ryg.a ? "a" : "") + "(" + Math.round(ryg[0]) + ", " + Math.round(ryg[1]) + ", " + Math.round(ryg[2]) + (ryg.a ? ", " + ryg.a : "") + ")";
};

function complimentary_hex(color) {
  var compi = complimentary([color.rgb.r, color.rgb.g, color.rgb.b]);
  var str = "#";
  str += compi[0].toString(16).padStart(2, "0");
  str += compi[1].toString(16).padStart(2, "0");
  str += compi[2].toString(16).padStart(2, "0");
  return str;
};

var values = document.getElementById("values");

var swatch = document.getElementById("swatch");
var rgb_r = document.getElementById("rgb_r");
var rgb_g = document.getElementById("rgb_g");
var rgb_b = document.getElementById("rgb_b");
var ryb_r = document.getElementById("ryb_r");
var ryb_y = document.getElementById("ryb_y");
var ryb_b = document.getElementById("ryb_b");
var per_r = document.getElementById("per_r");
var per_y = document.getElementById("per_y");
var per_b = document.getElementById("per_b");

example.on("color:change", function(color){
  swatch.innerHTML = [
    color.hexString
  ].join("")
  swatch.style.color = complimentary_hex(color);
  rgb_r.innerHTML = [
    Math.round(color.rgb.r)
  ].join("")
  rgb_g.innerHTML = [
    Math.round(color.rgb.g)
  ].join("")
  rgb_b.innerHTML = [
    Math.round(color.rgb.b)
  ].join("")
  var ryg = rgb2ryb([color.rgb.r, color.rgb.g, color.rgb.b]);
  var sum = ryg.reduce(function(pv, cv) { return pv + cv; }, 0);
  ryb_r.innerHTML = [
    Math.round(ryg[0])
  ].join("")
  ryb_y.innerHTML = [
    Math.round(ryg[1])
  ].join("")
  ryb_b.innerHTML = [
    Math.round(ryg[2])
  ].join("")
  per_r.innerHTML = [
    ((ryg[0] / sum) * 100).toFixed(1) + "%"
  ].join("")
  per_y.innerHTML = [
    ((ryg[1] / sum) * 100).toFixed(1) + "%"
  ].join("")
  per_b.innerHTML = [
    ((ryg[2] / sum) * 100).toFixed(1) + "%"
  ].join("")
});
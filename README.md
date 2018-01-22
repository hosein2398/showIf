

# ShowIf ![Build](https://img.shields.io/travis/hosein2398/showIf.svg) ![Dependencies](https://img.shields.io/david/hosein2398/showIf.svg) ![Devdependencies](https://img.shields.io/david/dev/hosein2398/showIf.svg)  ![Greenkeeper badge](https://badges.greenkeeper.io/hosein2398/showIf.svg)

Conditionally show/hide elements on your page depending on what user's browser is.

##Installing
```
npm i showif --save
```

## Usage	
There are three approaches to use this library.
- Show/hide an element based on type of user's browser.
- Show/hide an element based on type and version of user's browser.
- Add/remove a className based on type and version of user's browser.


So now lets try out each one with examples. 
For first one you need to add wanted className to the element for instance if you want to hide a element only on chrome you can write:
```html
<div class="hide-if-chrome">not shown in Chrome</div>
<div class="hide-if-firefox">not shown in Firefox</div>
```
So they are obvious enough to understand.

---

For second approach which you can also define the browser's version here goes an example:
```html
 <div class="show-if-firefox(>56) otherclass"> Lorem!.... </div>
```
This one will only be shown if the browser is Firefox and also if it's version is higher than 56.
Let's check out another one:
```html
<div class="show-if-firefox(=55)"> Say nothing </div>
```
This will only be represented in Firefox 55 !
Absolutely you can do contrary like :
```html
<div class="hide-if-chrome(<55)"> Say nothing </div>
```
This will be hidden in Chrome with version less than 55 . (or shown in Chrome with v. higher than 55)

---

Now the third approach , which you can define your condition and also the class  you want to be embedded when that condition goes right : 
```html
<p data-if-chrome="myclass"> Yeah </p>
```
So this will add class of `myclass` to this tag if user is in Chrome. Let's see another one:
```html
 <div data-if-chrome="(>54) myclass bold-it"> Sunday </div>
```
So this will add the classes `myclass` and `bold-it` to this element if user's in Chrome and it's version is higher that 54.

---

Now last one:

```html
<p data-if-chrome="(=56) reddy"> Working on it </p>
```
This one will have `reddy` class only in Chrome 56. Which is quite usefull.

## How this works 
So , you as a designer might ask that how this library works. After looping throw elements if the condition is not met as the browser in use, then  display of none is added to that element.

## Supported browsers
These browsers are supported for now:
- Chrome
- Firefox
- IE
- Safary 



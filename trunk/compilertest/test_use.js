function init() {
          var t = new myns.MyClass();
          alert(t.myProp);
          t.myProp = 'newProp';
          t.myMethod({
            myVeryLongJSONProperty:{
              anotherJSONProperty: 'myVeryLongJSONProperty.anotherJSONProperty'
              }
          });
          alert(myns.MyEnum.TWO);
}
window.onload = init;
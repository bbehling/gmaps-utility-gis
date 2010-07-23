  var myns = myns || {};
  /** @constructor */
  function MyClass(){
    this.myProp = 'myProp_Default';
  }
  
  MyClass.prototype.myMethod = function(json){
    this.myPrivateMethod(json);
  }
  MyClass.prototype.myPrivateMethod = function(/** @type {MyMessage}*/json){
    alert('json  '+json.myVeryLongJSONProperty.anotherJSONProperty + '  myProp:'+ this.myProp);
  }
  MyClass.prototype.myUnusedMethod = function(json){
    alert('unused method');
  }
  /**
   * @enum
   */
  var MyEnum = {
    ONE: 1, TWO: 2, THREE: 3
  }
  
  /**
   * @constructor
   */
  function MyClass2(){ 
    this.myProp2 = 'test';
  }
  
  window.myns = myns;
  myns.MyClass = MyClass;
  myns.MyEnum = MyEnum;
  
  
  
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
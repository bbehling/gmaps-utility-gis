/*
* ArcGIS for Google Maps Flash API
* @author nianwei at gmail dot com
*
* Licensed under the Apache License, Version 2.0:
*  http://www.apache.org/licenses/LICENSE-2.0
*/
package ags.gmaps {
  import com.google.maps.interfaces.ICopyrightCollection;
  import ags.service.*;
   import ags.*;

  /**
   * options to create an ArcGISTileLayer
   */
  public class ArcGISTileLayerOptions {
    
    /**
     * 
     * @default 
     */
    public var hosts:String;
    /**
     * 
     * @default 
     */
    public var copyrights:ICopyrightCollection;
    /**
     * 
     * @default 
     */
    public var minResolution:Number;
    /**
     * 
     * @default 
     */
    public var maxResolution:Number;
    /**
     * 
     * @default 
     */
    public var alpha:Number;
    /**
     * 
     * @default 
     */
    public var name:String;
    /**
     * 
     * @default 
     */
    public var projection:ArcGISProjection;
    

    /**
     * 
     * @param opts
     * 
     * 
     */
    public function ArcGISTileLayerOptions(opts:*=null) {
      if (opts) {
        Util.augmentObject(opts, this);
      }
    }

  }
}
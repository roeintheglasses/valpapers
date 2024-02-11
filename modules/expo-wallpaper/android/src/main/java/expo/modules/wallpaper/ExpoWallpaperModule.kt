package expo.modules.wallpaper

import android.app.WallpaperManager
import android.content.Context
import android.graphics.BitmapFactory
import android.net.Uri
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoWallpaperModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoWallpaper')` in JavaScript.
    Name("ExpoWallpaper")

    Function("setWallpaper") { options: Map<String, Any> ->
      try {
        val uri = options["uri"] as? String
        if (uri == null) {
         return@Function "uri Null"
        }
        val context: Context = context
        val wallpaperManager = WallpaperManager.getInstance(context)
        val inputStream = context.contentResolver.openInputStream(Uri.parse(uri))
        val bitmap = BitmapFactory.decodeStream(inputStream)
        wallpaperManager.setBitmap(bitmap)
        return@Function  "success"
      } catch (e: Exception) {
        e.printStackTrace()
        return@Function "fail"
      }
    }

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(ExpoWallpaperView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: ExpoWallpaperView, prop: String ->
        println(prop)
      }
    }
  }

  val context
  get() = requireNotNull(appContext.reactContext)

}

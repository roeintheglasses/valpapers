package expo.modules.wallpaper

import android.net.Uri
import android.os.AsyncTask
import com.facebook.react.bridge.Promise
import java.io.InputStream
import java.net.URL

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

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    AsyncFunction("setWallpaper") { args: ReadableArray ->
      val imagePath = args.getString(0)
      val promise = args.getPromise(1)

      AsyncTask.execute {
        try {
            val context: Context = reactApplicationContext.applicationContext
            val wallpaperManager = WallpaperManager.getInstance(context)
            val bitmap: Bitmap = when {
                imageUri.startsWith("http://") || imageUri.startsWith("https://") -> {
                    // Download the image from the URL
                    val inputStream: InputStream = URL(imageUri).openStream()
                    BitmapFactory.decodeStream(inputStream)
                }
                else -> {
                    // Assume it's a local file URI
                    val uri: Uri = Uri.parse(imageUri)
                    val inputStream: InputStream = context.contentResolver.openInputStream(uri)!!
                    BitmapFactory.decodeStream(inputStream)
                }
            }
            wallpaperManager.setBitmap(bitmap)
            promise.resolve(null) // Success
        } catch (e: Exception) {
            promise.reject("Error setting wallpaper", e)
        }
    }

    }
  }
}

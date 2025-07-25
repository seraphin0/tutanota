@file:JvmName("Utils")

package de.tutao.tutashared

import android.content.Context
import android.content.SharedPreferences
import android.content.res.Resources
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.provider.OpenableColumns
import android.util.Base64
import androidx.annotation.ColorInt
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.apache.commons.io.IOUtils
import org.json.JSONException
import org.json.JSONObject
import java.io.*
import java.nio.charset.Charset
import java.security.SecureRandom
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.TimeZone
import kotlin.random.Random

fun SecureRandom.bytes(numBytes: Int): ByteArray {
	val array = ByteArray(numBytes)
	nextBytes(array)
	return array
}

fun ByteArray.toBase64(): String = Base64.encodeToString(this, Base64.NO_WRAP)

fun ByteArray.toHexString() = joinToString("") { java.lang.String.format("%02x", it) }


fun File.toUri(): String = Uri.fromFile(this).toString()

data class FileInfo(var name: String, var size: Long)

fun String.base64ToBytes(): ByteArray {
	return Base64.decode(this, Base64.NO_WRAP)
}

fun String.base64ToString(): String = String(this.base64ToBytes())

fun String.base64ToBase64Url(): String {
	return replace("\\+".toRegex(), "-")
		.replace("/".toRegex(), "_")
		.replace("=".toRegex(), "")
}

@Throws(IOException::class)
suspend fun File.readBytes(): ByteArray = withContext(Dispatchers.IO) {
	FileInputStream(this@readBytes).use(IOUtils::toByteArray)
}

@Throws(IOException::class)
suspend fun File.writeBytes(bytes: ByteArray) = withContext(Dispatchers.IO) {
	parentFile!!.let {
		if (!it.exists()) {
			it.mkdirs()
		}
	}
	if (!exists()) {
		createNewFile()
	}

	FileOutputStream(this@writeBytes).use { it.write(bytes) }
}

@Throws(FileNotFoundException::class)
fun getFileInfo(context: Context, fileUri: Uri): FileInfo {
	val scheme = fileUri.scheme

	if (scheme == null || scheme == "file") {
		return FileInfo(fileUri.lastPathSegment!!, File(fileUri.path!!).length())
	} else if (scheme == "content") {
		try {
			context.contentResolver.query(fileUri, null, null, null, null).use { cursor ->
				if (cursor != null && cursor.moveToFirst()) {
					val filename =
						cursor.getString(cursor.getColumnIndexOrThrow(OpenableColumns.DISPLAY_NAME))
							?: fileUri.lastPathSegment
					return FileInfo(filename!!, cursor.getLong(cursor.getColumnIndexOrThrow(OpenableColumns.SIZE)))
				}
			}
		} catch (e: SecurityException) {
			// When file is deleted SecurityException may be thrown instead.
			throw FileNotFoundException(fileUri.toString())
		}
	}
	throw RuntimeException("could not resolve file name / size for uri $fileUri")
}

fun atLeastTiramisu(): Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU

fun atLeastQuinceTart(): Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q

@Throws(JSONException::class)
fun JSONObject.toMap(): MutableMap<String, String> {
	val map: MutableMap<String, String> = HashMap()
	val keys = keys()
	while (keys.hasNext()) {
		val key = keys.next()
		map[key] = getString(key)
	}
	return map
}

fun String.isLightHexColor(): Boolean {
	val argb = parseColor(this)
	val r = argb shr 16 and 0xff // extract red
	val g = argb shr 8 and 0xff // extract green
	val b = argb and 0xff // extract blue

	// Counting the perceptive luminance
	// human eye favors green color...
	val a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return a < 0.5
}

/** parse #RGB or #RRGGBB color codes into an 0xAARRGGBB int  */
@ColorInt
fun parseColor(color: String): Int {
	require(color[0] == '#' && (color.length == 4 || color.length == 7)) { "Invalid color format: $color" }
	val normalizedColor = if (color.length == 4) {
		val chars = charArrayOf(
			'#',
			color[1],
			color[1],
			color[2],
			color[2],
			color[3],
			color[3]
		)
		String(chars)
	} else {
		color
	}
	val rgb = normalizedColor.substring(1).toInt(16)

	// alpha channel is always max
	return rgb or -0x1000000
}

fun Int.toPx(): Int = (this * Resources.getSystem().displayMetrics.density).toInt()

fun Int.toDp(): Int = (this / Resources.getSystem().displayMetrics.density).toInt()

fun getDefaultSharedPreferences(context: Context): SharedPreferences {
	val name = context.packageName + "_preferences"
	return context.getSharedPreferences(name, Context.MODE_PRIVATE)
}

inline fun Cursor.forEachRow(block: (cursor: Cursor) -> Unit) {
	while (this.moveToNext()) {
		block(this)
	}
}

inline fun <R, C : MutableCollection<in R>> Cursor.mapTo(collection: C, mapper: (cursor: Cursor) -> R): C {
	forEachRow { collection.add(mapper(this)) }
	return collection
}

fun isAllDayEventByTimes(startDate: Date, endDate: Date): Boolean {
	val calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
	calendar.time = startDate
	val startFits = calendar[Calendar.HOUR] == 0 && calendar[Calendar.MINUTE] == 0 && calendar[Calendar.SECOND] == 0
	calendar.time = endDate
	val endFits = calendar[Calendar.HOUR] == 0 && calendar[Calendar.MINUTE] == 0 && calendar[Calendar.SECOND] == 0
	return startFits && endFits
}

fun getLogcat(rootDir: File, filePrefix: String = "log"): String {
	val logFile = File(rootDir, "$filePrefix-${System.currentTimeMillis()}-${Random.nextInt()}.txt")
	logFile.delete()
	logFile.createNewFile()

	// -d means print and exit without blocking, -T gets last lines, -f outputs to file
	val process = Runtime.getRuntime().exec(arrayOf("logcat", "-d", "-T", "1500", "-f", logFile.absolutePath))
	try {
		process.waitFor()
	} catch (ignored: InterruptedException) {
	}
	if (process.exitValue() != 0) {
		val error = IOUtils.toString(process.errorStream, Charset.defaultCharset())
		logFile.delete()
		throw RuntimeException("Reading logs failed: " + process.exitValue() + ", " + error)
	}

	val text = logFile.readText()

	logFile.delete()

	return text
}

/**
 * Returns whether two timestamps belong to the same day considering the time zone
 * @param time1 epoch time 1 in milliseconds
 * @param time2 epoch time 2 in milliseconds
 * @param timeZone optional, should only be used for testing! | otherwise the default value is used
 * @return boolean whether both timestamp are on the same day
 */
fun isSameDay(time1: Long, time2: Long, timeZone: TimeZone = TimeZone.getDefault()): Boolean {
	val customDateFormat = SimpleDateFormat("yyyy-MM-dd")
	customDateFormat.setTimeZone(timeZone)
	return customDateFormat.format(time1).equals(customDateFormat.format(time2))
}
package foundation.network

import kotlinx.serialization.Serializable

@Serializable
internal data class HttpError(
    val message: String,
    val timeStamp: String,
    val errorCode: Int = 0
)


class HttpException(
    override val message: String,
    val timeStamp: String,
    val errorCode: Int
) : Throwable()





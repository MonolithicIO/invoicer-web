package foundation.uievent

import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow

interface UiEventOwner<T> {
    val events: SharedFlow<T>

    suspend fun sendEvent(event: T)
}

class UiEventManager<T> : UiEventOwner<T> {
    private val _events = MutableSharedFlow<T>()

    override val events: SharedFlow<T> =
        _events.asSharedFlow()

    override suspend fun sendEvent(event: T) {
        _events.emit(event)
    }
}
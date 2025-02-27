@file:OptIn(ExperimentalUuidApi::class)

package foundation.uievent

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.update
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid


internal data class EventInstance<T>(
    val id: Uuid,
    val data: T
)

interface UiEventSource<T> {
    fun sendEvent(event: T)
}

class UiEvent<T> : UiEventSource<T> {

    internal val eventChannel = MutableStateFlow<List<EventInstance<T>>>(listOf())

    @OptIn(ExperimentalUuidApi::class)
    override fun sendEvent(event: T) {
        eventChannel.update {
            it + EventInstance(data = event, id = Uuid.random())
        }
    }

    internal fun consumeEvent(event: EventInstance<T>) {
        eventChannel.update { oldList ->
            oldList.filter { item -> item.id != event.id }
        }
    }
}

@Composable
internal fun <T> UiEventEffect(
    eventSource: UiEvent<T>,
    onEvent: (T) -> Unit
) {
    LaunchedEffect(eventSource) {
        eventSource.eventChannel.collectLatest { event ->
            event.firstOrNull()?.let {
                onEvent(it.data)
                eventSource.consumeEvent(it)
            }
        }
    }
}
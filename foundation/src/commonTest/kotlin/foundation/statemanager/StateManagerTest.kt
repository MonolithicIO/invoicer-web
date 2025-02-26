package foundation.statemanager

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@ExperimentalCoroutinesApi
class StateManagerTest {

    private data class TestState(
        val text: String = "",
    )

    private val dispatcher = StandardTestDispatcher()
    private lateinit var manager: StateManager<TestState>

    @Test
    fun instance_should_start_with_given_initialState() = runTest(dispatcher) {
        manager = StateManager(TestState(text = "initial"))

        assertEquals(
            expected = "initial",
            actual = manager.state.value.data.text
        )
    }

    @Test
    fun instance_should_start_with_given_initialMode() = runTest(dispatcher) {
        manager = StateManager(TestState(), initialMode = StateMode.Loading)

        assertEquals(
            expected = StateMode.Loading,
            actual = manager.state.value.mode
        )
    }

    @Test
    fun updateState_call_should_set_new_data() = runTest(dispatcher) {
        manager = StateManager(TestState())

        manager.updateState {
            update {
                it.copy(text = "new text")
            }
        }

        assertEquals(
            expected = "new text",
            actual = manager.state.value.data.text
        )
    }


    @Test
    fun updateState_call_should_set_intermediary_loading_state() = runTest(dispatcher) {
        val stateSnapshots = mutableListOf<UiState<TestState>>()

        manager = StateManager(TestState(), StateMode.Loading)

        manager.state.onEach { stateSnapshots.add(it) }.launchIn(this.backgroundScope)

        manager.updateState(
            showLoading = true
        ) {
            update { oldState ->
                oldState.copy(text = "new value")
            }
            update { oldState ->
                oldState.copy(text = "new value3")
            }
        }
        advanceUntilIdle()

        println(stateSnapshots)
        assertTrue { stateSnapshots.map { it.mode }.contains(StateMode.Loading) }

        assertEquals(
            expected = "new text",
            actual = manager.state.value.data.text
        )
    }

    @Test
    fun unhandled_exception_should_set_state_to_error() = runTest(dispatcher) {
        val exception = IllegalStateException("error")
        manager = StateManager(TestState())

        manager.updateState {
            throw exception
        }

        assertEquals(
            expected = StateMode.Error(exception),
            actual = manager.state.value.mode
        )
    }

    @Test
    fun updateStateSync_call_should_set_new_data() {
        manager = StateManager(TestState())

        manager.updateStateSync {
            update {
                it.copy(text = "new text")
            }
        }

        assertEquals(
            expected = "new text",
            actual = manager.state.value.data.text
        )
    }


    @Test
    fun updateStateSync_call_should_set_intermediary_loading_state() = runTest(dispatcher) {
        val stateSnapshots = mutableListOf<UiState<TestState>>()

        manager = StateManager(TestState(), StateMode.Loading)

        manager.state.onEach { stateSnapshots.add(it) }.launchIn(this.backgroundScope)

        manager.updateStateSync(
            showLoading = true
        ) {
            update { oldState ->
                oldState.copy(text = "new value")
            }
            update { oldState ->
                oldState.copy(text = "new value3")
            }
        }

        println(stateSnapshots)
        assertTrue { stateSnapshots.map { it.mode }.contains(StateMode.Loading) }

        assertEquals(
            expected = "new text",
            actual = manager.state.value.data.text
        )
    }

    @Test
    fun updateStateSync_unhandled_exception_should_set_state_to_error() {
        val exception = IllegalStateException("error")
        manager = StateManager(TestState())

        manager.updateStateSync {
            throw exception
        }

        assertEquals(
            expected = StateMode.Error(exception),
            actual = manager.state.value.mode
        )
    }
}
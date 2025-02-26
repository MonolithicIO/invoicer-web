package features.ui.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import features.ui.designsystem.tokens.Spacing
import kotlinx.collections.immutable.ImmutableList

@Composable
internal fun NumberedList(
    modifier: Modifier = Modifier,
    items: ImmutableList<String>,
) {
    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(Spacing.small)
    ) {
        items.forEachIndexed { index, item ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Spacing.small)
            ) {
                ItemIndex(
                    number = index + 1,
                )
                Text(
                    text = item,
                )
            }
        }
    }
}

@Composable
private fun ItemIndex(
    number: Int,
) {
    Box(
        modifier = Modifier
            .size(24.dp)
            .clip(CircleShape)
            .background(MaterialTheme.colors.onSurface),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = number.toString(),
            color = MaterialTheme.colors.surface,
        )
    }
}
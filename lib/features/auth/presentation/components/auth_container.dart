import 'package:flutter/material.dart';

final class AuthContainer extends StatelessWidget {
  const AuthContainer({
    super.key,
    required this.leftSection,
    required this.rightSection,
  });

  final Widget leftSection;
  final Widget rightSection;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          Expanded(
            child: Ink(
              color: Theme.of(context).colorScheme.primary,
              child: leftSection,
            ),
          ),
          Expanded(
            child: Ink(
              color: Theme.of(context).colorScheme.surfaceContainerHigh,
              child: rightSection,
            ),
          ),
        ],
      ),
    );
  }
}

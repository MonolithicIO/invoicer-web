import 'package:flutter/material.dart';

class AuthMenuRightSection extends StatelessWidget {
  const AuthMenuRightSection({
    super.key,
    required this.onSignUpTap,
    required this.onSignInTap,
  });

  final VoidCallback onSignUpTap;
  final VoidCallback onSignInTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      spacing: 12,
      children: [
        FilledButton.tonal(onPressed: onSignInTap, child: Text("Sign in")),
        FilledButton.tonal(onPressed: onSignUpTap, child: Text("Sign up")),
      ],
    );
  }
}

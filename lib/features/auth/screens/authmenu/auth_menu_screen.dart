import 'package:auto_route/annotations.dart';
import 'package:flutter/material.dart';
import 'package:invoicer_web/features/auth/screens/authmenu/components/AuthMenuRightSection.dart';

@RoutePage()
class AuthMenuScreen extends StatelessWidget {
  const AuthMenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Row(
          children: [
            Expanded(
              child: Ink(color: Theme.of(context).scaffoldBackgroundColor, child: Column()),
            ),
            Expanded(
              child: Ink(
                color: Theme.of(context).primaryColor,
                child: AuthMenuRightSection(
                  onSignInTap: () {},
                  onSignUpTap: () {},
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

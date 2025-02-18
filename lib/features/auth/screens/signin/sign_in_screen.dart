import 'package:auto_route/annotations.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:invoicer_web/features/auth/components/auth_container.dart';
import 'package:invoicer_web/navigation/app_router.gr.dart';

@RoutePage()
final class SignInScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SignInScreenState();
  }
}

final class _SignInScreenState extends State<SignInScreen> {
  bool _passwordCensored = true;

  @override
  Widget build(BuildContext context) {
    return AuthContainer(
      leftSection: Column(),
      rightSection: FractionallySizedBox(
        widthFactor: 0.7,
        child: Column(
          children: [
            Spacer(),
            Align(
              alignment: Alignment.topLeft,
              child: BackButton(
                onPressed: () {
                  context.router.popAndPush(AuthMenuRoute());
                },
              )
            ),
            SizedBox(height: 16),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              spacing: 16,
              children: [
                Text(
                  "Welcome to Invoicer",
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                Text(
                  "Sign in to continue",
                  style: Theme.of(context).textTheme.titleSmall,
                ),
                SizedBox(height: 16),
                TextField(
                  decoration: InputDecoration(
                    label: Text('Email'),
                    prefixIcon: Icon(Icons.email),
                  ),
                  onChanged: (value) {
                    setState(() {
                      _email = value;
                    });
                  },
                  autocorrect: false,
                  maxLines: 1,
                ),
                SizedBox(height: 8),
                TextField(
                  decoration: InputDecoration(
                    label: Text('Password'),
                    prefixIcon: Icon(Icons.lock),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _passwordCensored ? Icons.visibility : Icons.visibility_off,
                      ),
                      onPressed: () {
                        setState(() {
                          _passwordCensored = !_passwordCensored;
                        });
                      },
                    ),
                  ),
                  onChanged: (value) {
                    setState(() {
                      _password = value;
                    });
                  },
                  autocorrect: false,
                  obscureText: _passwordCensored,
                  maxLines: 1,
                ),
                SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: TextButton(
                      onPressed: (){},
                      child: Text("Don't have an account? Sign up")
                  ),
                ),
                SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: FilledButton(
                    onPressed: () {},
                    child: Text("Sign in"),
                  ),
                ),
              ],
            ),
            Spacer(),
          ],
        ),
      ),
    );
  }
}

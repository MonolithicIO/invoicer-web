import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:invoicer_web/features/auth/presentation/screens/signin/sign_in_viewmodel.dart';
import 'package:invoicer_web/foundation/di/app_di.dart';
import 'package:invoicer_web/navigation/app_router.gr.dart';

import '../../components/auth_container.dart';

@RoutePage()
final class SignInScreen extends StatelessWidget {
  SignInScreen({super.key});

  final SignInViewModel viewModel = getIt.get();

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: viewModel,
      builder: (context, _) {
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
                  ),
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
                    TextField(
                      decoration: InputDecoration(
                        label: Text('Email'),
                        prefixIcon: Icon(Icons.email),
                      ),
                      onChanged: (value) {
                        viewModel.updateEmail(value);
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
                            viewModel.passwordCensored
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                          onPressed: () {
                            viewModel.togglePasswordVisibility();
                          },
                        ),
                      ),
                      onChanged: (value) {
                        viewModel.updatePassword(value);
                      },
                      autocorrect: false,
                      obscureText: viewModel.passwordCensored,
                      maxLines: 1,
                    ),
                    SizedBox(
                      width: double.infinity,
                      child: TextButton(
                        onPressed: () {},
                        child: Text("Don't have an account? Sign up"),
                      ),
                    ),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: FilledButton(
                        onPressed: () {
                          viewModel.signIn();
                        },
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
      },
    );
  }
}

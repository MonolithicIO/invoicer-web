import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:invoicer_web/features/auth/data/model/SignInRequestData.dart';
import 'package:invoicer_web/features/auth/data/model/SignInResponseData.dart';

abstract class AuthRemoteDataSource {
  Future<SignInResponseData> signIn(SignInRequestData request);
}

final class AuthRemoteDataSourceImpl extends AuthRemoteDataSource {
  @override
  Future<SignInResponseData> signIn(SignInRequestData request) async {
    final response = await http.post(
      Uri.parse("http://localhost:4000/v1/auth/signin"),
      body: jsonEncode(request.toJson()),
    );

    if (response.statusCode == 200) {
      return SignInResponseData.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to sign in');
    }
  }
}

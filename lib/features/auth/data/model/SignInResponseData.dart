final class SignInResponseData {
  SignInResponseData(this.accessToken, this.refreshToken);

  final String accessToken;
  final String refreshToken;

  factory SignInResponseData.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'token': String _, 'refreshToken': String _} => SignInResponseData(
        json['token'],
        json['refreshToken'],
      ),
      _ => throw Exception('Invalid JSON'),
    };
  }
}

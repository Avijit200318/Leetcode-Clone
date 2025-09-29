import React from 'react'
import { Html, Head, Font, Preview, Heading, Row, Section, Text } from '@react-email/components';

interface VerificationEmailProps {
    username: string,
    otp: string
}

export default function ForgetPasswordVerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <title>Forget Password</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for using LeetCode Clone (developed by Avijit).
                        You recently requested to reset your password. Please use the verification code below to proceed:
                        Code:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code, please ignore this email and don't share this code with anyone.
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}

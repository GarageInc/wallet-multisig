import React, { useCallback } from 'react'
import { useHistory } from 'react-router'

import ContentWrapper from '../../components/ContentWrapper/ContentWrapper'
import styles from './TermsOfUse.module.scss'

const TermsOfUse = ({ goBack }: { goBack?: () => void }) => {
  const history = useHistory()

  const onBackClicked = useCallback(() => {
    goBack ? goBack() : history.goBack()
  }, [goBack, history])

  return (
    <ContentWrapper title="Terms of Use" noFooter={true} goBack={onBackClicked}>
      <h3 className={styles.subTitle}>Last updated: 28 February 2021</h3>

      <div className={styles.content}>
        <h2>
          <strong>1. Acceptance of terms</strong>
        </h2>

        <p>
          TotalSig (“TotalSig,” “we,” “us,” or “our”) provides a protocol allowing a group of people to receive and send
          any crypto assets. It is a trustless crypto assets wallet enabling crypto assets control by removing the
          custodial risks from their operation using our APIs (the “API”) and browser plugin (the “Extension”) and
          mobile application (the “App”) — which includes text, images, audio, code and other materials (collectively,
          the “Content”) and all of the features, and services provided. The “Extension”, the App and any other
          features, tools, materials, or other services offered from time to time by TotalSig are referred to here as
          the “Software.” Please read these Terms of Use (the “Terms” or “Terms of Use”) carefully before using the
          Software. By using or otherwise accessing the Software, or clicking to accept or agree to these Terms where
          that option is made available, you (1) accept and agree to these Terms, (2) consent to the collection, use,
          disclosure and other handling of information as described in our Privacy Policy and (3) agree to any
          additional terms, rules and conditions of participation issued by TotalSig from time to time. If you do not
          agree to the Terms, then you may not access or use the Content or Software.
        </p>

        <h2>
          <strong>2. Modification of Terms of Use</strong>
        </h2>
        <p>
          Except for Section 14, providing for binding arbitration and waiver of class action rights, TotalSig reserves
          the right, at its sole discretion, to modify or replace the Terms of Use at any time. The most current version
          of these Terms is awailable in the Extension and in the App. You shall be responsible for reviewing and
          becoming familiar with any such modifications. Use of the Software by you after any modification to the Terms
          constitutes your acceptance of the Terms of Use as modified.
        </p>

        <h2>
          <strong>3. Eligibility</strong>
        </h2>
        <p>
          You hereby represent and warrant that you are fully able and competent to enter into the terms, conditions,
          obligations, affirmations, representations and warranties set forth in these Terms and to abide by and comply
          with these Terms.
        </p>
        <p>
          TotalSig is a global platform and by accessing the Content or Software, you are representing and warranting
          that you are of the legal age of majority in your jurisdiction as is required to access such Software and
          Content and enter into arrangements as provided by the Software. You further represent that you are otherwise
          legally permitted to use the Software in your jurisdiction including owning cryptographic tokens of value, and
          interacting with the Software or Content in any way. You further represent you are responsible for ensuring
          compliance with the laws of your jurisdiction and acknowledge that TotalSig is not liable for your compliance
          with such laws.
        </p>

        <h2>
          <strong>4. Account Password and Security</strong>
        </h2>
        <p>
          When setting up an account within TotalSig, you will be responsible for keeping your own account secrets,
          which may be a fifteen-word seed phrase, an backup file, or other locally stored secret information. TotalSig
          encrypts this information locally with a password you provide, that we never send to our servers. You agree to
          (a) never use the same password for TotalSig that you have ever used outside of this Software, (b) keep your
          secret information and password confidential and do not share them with anyone else and (c) immediately notify
          TotalSig of any unauthorized use of your account or breach of security. TotalSig cannot and will not be liable
          for any loss or damage arising from your failure to comply with this section.
        </p>

        <h2>
          <strong>5. REPRESENTATIONS, WARRANTIES AND RISKS</strong>
        </h2>

        <p>
          <strong>5.1. Warranty disclaimer</strong>
        </p>
        <p>
          You expressly understand and agree that your use of the Software is at your sole risk. The Software (including
          the the Content) are provided on an “AS IS” and “as available” basis, without warranties of any kind, either
          express or implied, including, without limitation, implied warranties of merchantability, fitness for a
          particular purpose or non-infringement. You acknowledge that TotalSig has no control over, and no duty to take
          any action regarding: which users gain access to or use the Software; what effects the Content may have on
          you; how you may interpret or use the Content; or what actions you may take as a result of having been exposed
          to the Content. You release TotalSig from all liability for you having acquired or not acquired Content
          through the Software. TotalSig makes no representations concerning any Content contained in or accessed
          through the Software, and TotalSig will not be responsible or liable for the accuracy, copyright compliance,
          legality or decency of material contained in or accessed through the Software.
        </p>
        <p>
          You acknowledge that TotalSig is not responsible for transferring, safeguarding, or maintaining your private
          keys or any digital currency associated therewith. If you lose, mishandle or have stolen associated digital
          currency private keys, you acknowledge that you may not be able to recover associated digital currency, and
          that TotalSig is not responsible for such loss. You acknowledge that TotalSig is not responsible for any loss,
          damage or liability arising from your failure to comply with the terms hereunder.
        </p>

        <p>
          <strong>5.2 Sophistication and Risk of Cryptographic Systems</strong>
        </p>
        <p>
          By utilizing the Software or interacting with the Content or platform in any way, you represent that you
          understand the inherent risks associated with cryptographic systems; and warrant that you have an
          understanding of the usage and intricacies of native cryptographic tokens, like Ether (ETH) and Bitcoin (BTC),
          smart contract based tokens such as those that follow the Ethereum Token Standard
          (https://github.com/ethereum/EIPs/issues/20), and blockchain-based software systems.
        </p>

        <p>
          <strong>5.3 Risk of Regulatory Actions in One or More Jurisdictions</strong>
        </p>
        <p>
          TotalSig could be impacted by one or more regulatory inquiries or regulatory action, which could impede or
          limit the ability of TotalSig to continue to develop, or which could impede or limit your ability to access or
          use the Software or any blockchain.
        </p>

        <p>
          <strong>5.4 Risk of Weaknesses or Exploits in the Field of Cryptography</strong>
        </p>
        <p>
          You acknowledge and understand that Cryptography is a progressing field. Advances in code cracking or
          technical advances such as the development of quantum computers may present risks to cryptocurrencies and
          Software of Content, which could result in the theft or loss of your cryptographic tokens or property. To the
          extent possible, TotalSig intends to update the protocol underlying Software to account for any advances in
          cryptography and to incorporate additional security measures, but does not guarantee or otherwise represent
          full security of the system. By using the Software or accessing Content, you acknowledge these inherent risks.
        </p>

        <p>
          <strong>5.5 Volatility of Cryptocurrencies</strong>
        </p>
        <p>
          You understand that Ethereum and other blockchain technologies and associated currencies or tokens are highly
          volatile due to many factors including but not limited to adoption, speculation, technology and security
          risks. You also acknowledge that the cost of transacting on such technologies is variable and may increase at
          any time causing impact to any activities taking place on the Ethereum or other blockchains. You acknowledge
          these risks and represent that TotalSig cannot be held liable for such fluctuations or increased costs.
        </p>

        <p>
          <strong>5.6 Application Security</strong>
        </p>
        <p>
          You acknowledge that Ethereum applications are code subject to flaws and acknowledge that you are solely
          responsible for evaluating any code provided by the Software or Content and the trustworthiness of any
          third-party websites, products, smart-contracts, or Content you access or use through the Software. You
          further expressly acknowledge and represent that Ethereum applications can be written maliciously or
          negligently, that TotalSig cannot be held liable for your interaction with such applications and that such
          applications may cause the loss of property or even identity. This warning and others later provided by
          TotalSig in no way evidence or represent an on-going duty to alert you to all of the potential risks of
          utilizing the Software or Content.
        </p>

        <p>
          <strong>5.7 Mobile Application</strong>
        </p>
        <p>
          You acknowledge that the Extension and the App are in public beta and still undergoing testing before its
          official release. As such, the Software provided through the Extension and the App is not intended to be
          relied on for any reason whatsoever or used in a production environment. You acknowledge and accept that the
          Extension, the App or the Software (a) may contain bugs, errors and defects, (b) may function improperly or be
          subject to periods of downtime and unavailability, (c) may result in total or partial loss or corruption of
          data and (d) may be modified at any time, including through the release of subsequent versions, all with or
          without notice to you. The Software is available on an “as is” basis for the sole purpose of collecting
          feedback on quality, usability, performance and defects.
        </p>

        <p>
          <strong>5.8 EXCHANGE SYSTEM</strong>
        </p>
        <p>
          You acknowledge that the EXCHANGE SYSTEM feature on the App is experimental in nature. It interacts with, and
          relies on, a third party application, including the underlying payment channel network. You accept that there
          are risks with using Instapay, including without limitation, inability to access any digital assets that are
          locked in the payment channel or its smart contract, which may be caused by communication failures,
          unavailability of the third party network or software bugs or errors in the App or the third party application
          or network or any other reason. You agree that TotalSig is not responsible for any loss in your digital assets
          or delay in accessing such digital assets. We may cap the maximum amount of digital assets that you may
          deposit into Instapay and we may increase or decrease this cap in our sole discretion without notice to you.
        </p>

        <h2>
          <strong>6. Indemnity</strong>
        </h2>
        <p>
          You agree to release and to indemnify, defend and hold harmless TotalSig and its parents, subsidiaries,
          affiliates and agencies, as well as the officers, directors, employees, shareholders and representatives of
          any of the foregoing entities, from and against any and all losses, liabilities, expenses, damages, costs
          (including attorneys’ fees and court costs) claims or actions of any kind whatsoever arising or resulting from
          your use of the Software, your violation of these Terms of Use, and any of your acts or omissions that
          implicate publicity rights, defamation or invasion of privacy. TotalSig reserves the right, at its own
          expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by you
          and, in such case, you agree to cooperate with TotalSig in the defense of such matter.
        </p>
        <h2>
          <strong>7. Limitation on liability</strong>
        </h2>
        <p>
          YOU ACKNOWLEDGE AND AGREE THAT YOU ASSUME FULL RESPONSIBILITY FOR YOUR USE OF THE EXTENSION, THE APP AND THE
          SOFTWARE. YOU ACKNOWLEDGE AND AGREE THAT ANY INFORMATION YOU SEND OR RECEIVE DURING YOUR USE OF THE EXTENSION,
          THE APP AND THE SOFTWARE MAY NOT BE SECURE AND MAY BE INTERCEPTED OR LATER ACQUIRED BY UNAUTHORIZED PARTIES.
          YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE EXTENSION, THE APP AND THE SOFTWARE IS AT YOUR OWN RISK.
          RECOGNIZING SUCH, YOU UNDERSTAND AND AGREE THAT, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, NEITHER
          TOTALSIG NOR ITS SUPPLIERS OR LICENSORS WILL BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, PUNITIVE, EXEMPLARY OR OTHER DAMAGES OF ANY KIND, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS
          OF PROFITS, GOODWILL, USE, DATA OR OTHER TANGIBLE OR INTANGIBLE LOSSES OR ANY OTHER DAMAGES BASED ON CONTRACT,
          TORT, STRICT LIABILITY OR ANY OTHER THEORY (EVEN IF COSIG HAD BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES), RESULTING FROM THE EXTENSION, THE APP AND THE SOFTWARE; THE USE OR THE INABILITY TO USE THE
          EXTENSION, THE APP AND THE SOFTWARE; UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA;
          STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE EXTENSION, THE APP AND THE SOFTWARE; ANY ACTIONS WE TAKE OR
          FAIL TO TAKE AS A RESULT OF COMMUNICATIONS YOU SEND TO US; HUMAN ERRORS; TECHNICAL MALFUNCTIONS; FAILURES,
          INCLUDING PUBLIC UTILITY OR TELEPHONE OUTAGES; OMISSIONS, INTERRUPTIONS, LATENCY, DELETIONS OR DEFECTS OF ANY
          DEVICE OR NETWORK, PROVIDERS, OR SOFTWARE (INCLUDING, BUT NOT LIMITED TO, THOSE THAT DO NOT PERMIT
          PARTICIPATION IN THE SERVICE); ANY INJURY OR DAMAGE TO COMPUTER EQUIPMENT; INABILITY TO FULLY ACCESS THE
          EXTENSION, THE APP AND THE SOFTWARE OR ANY OTHER WEBSITE; THEFT, TAMPERING, DESTRUCTION, OR UNAUTHORIZED
          ACCESS TO, IMAGES OR OTHER CONTENT OF ANY KIND; DATA THAT IS PROCESSED LATE OR INCORRECTLY OR IS INCOMPLETE OR
          LOST; TYPOGRAPHICAL, PRINTING OR OTHER ERRORS, OR ANY COMBINATION THEREOF; OR ANY OTHER MATTER RELATING TO THE
          EXTENSION, THE APP AND THE SOFTWARE.
        </p>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF
          LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO
          YOU.
        </p>

        <h2>
          <strong>8. Intellectual Property</strong>
        </h2>
        <p>
          <strong>8.1 Our Proprietary Rights</strong>
        </p>
        <p>
          All title, ownership and intellectual property rights in and to the Software are owned by TotalSig or its
          licensors. You acknowledge and agree that the Software contains proprietary and confidential information that
          is protected by applicable intellectual property and other laws. Except as expressly authorized by TotalSig,
          you agree not to copy, modify, rent, lease, loan, sell, distribute, perform, display or create derivative
          works based on the Extension, the App or the Software, in whole or in part.
        </p>
        <p>
          <strong>8.2 Limited License</strong>
        </p>
        <p>
          We grant you limited, non-exclusive, revocable permission to make use of the Extension, the App and the
          Software (collectively, “Access”). This Access shall remain in effect until and unless terminated by you or
          us. You promise and agree that you will not redistribute or transfer the Software.
        </p>
        <p>
          The TotalSig software application, including without limitation the Extension, the App and the Software, are
          not sold or transferred to you, and TotalSig and its licensors retain ownership of all copies of the software
          applications even after installation on your personal computers, mobile handsets, tablets, wearable devices,
          speakers and/or other devices (“Devices”).
        </p>
        <p>
          All TotalSig trademarks, service marks, trade names, logos, domain names, and any other features of the
          TotalSig brand (“TotalSig Brand Features”) are the sole property of TotalSig or its licensors. The Terms do
          not grant you any rights to use any TotalSig Brand Features whether for commercial or non-commercial use.
        </p>
        <p>
          You agree to abide by our user guidelines and not to use the Software or any part thereof in any manner not
          expressly permitted by the Terms. Except for the rights expressly granted to you in the Terms, TotalSig grants
          no right, title, or interest to you in the Extension, the App or the Software.
        </p>
        <p>
          Third party software (for example, open source software libraries) included in the Software are made available
          to you under the relevant third party software library’s license terms.
        </p>
        <p>
          Notwithstanding anything herein to the contrary, nothing in the Terms entitles you to use, copy, fork, modify
          or create derivative works based on the Extension&apos;s and the App’s source code for commercial purposes
          without our prior written consent. A separate license solely to inspect and study the App’s source code can be
          found at https://github.com/whalesheaven/totalsig#license.
        </p>

        <h2>
          <strong>9. Links</strong>
        </h2>
        <p>
          The Software provides, or third parties may provide, links to other World Wide Web or accessible sites,
          applications or resources. Because TotalSig has no control over such sites, applications and resources, you
          acknowledge and agree that TotalSig is not responsible for the availability of such external sites,
          applications or resources, and does not endorse and is not responsible or liable for any content, advertising,
          products or other materials on or available from such sites or resources. You further acknowledge and agree
          that TotalSig shall not be responsible or liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with use of or reliance on any such content, goods or services
          available on or through any such site or resource.
        </p>

        <h2>
          <strong>10. Termination and suspension</strong>
        </h2>
        <p>
          TotalSig may terminate or suspend all or part of the API, without prior notice or liability, if you breach any
          of the terms or conditions of the Terms. Upon termination of your access, your right to use the Software will
          immediately cease.
        </p>
        <p>
          The following provisions of the Terms survive any termination of these Terms: INDEMNITY; WARRANTY DISCLAIMERS;
          LIMITATION ON LIABILITY; OUR PROPRIETARY RIGHTS; LINKS; TERMINATION; NO THIRD PARTY BENEFICIARIES; BINDING
          ARBITRATION AND CLASS ACTION WAIVER; GENERAL INFORMATION.
        </p>

        <h2>
          <strong>11. No third party beneficiaries</strong>
        </h2>
        <p>
          You agree that, except as otherwise expressly provided in these Terms, there shall be no third party
          beneficiaries to the Terms.
        </p>

        <h2>
          <strong>12. Notice and procedure for making claims of copyright infringement</strong>
        </h2>
        <p>
          If you believe that your copyright or the copyright of a person on whose behalf you are authorized to act has
          been infringed, please provide TotalSig’s Copyright Agent a written Notice containing the following
          information:
        </p>
        <p>
          · an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright
          or other intellectual property interest;
        </p>
        <p>· a description of the copyrighted work or other intellectual property that you claim has been infringed;</p>
        <p>· a description of where the material that you claim is infringing is located on the Software;</p>
        <p>· your address, telephone number, and email address;</p>
        <p>
          · a statement by you that you have a good faith belief that the disputed use is not authorized by the
          copyright owner, its agent, or the law;
        </p>
        <p>
          · a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and
          that you are the copyright or intellectual property owner or authorized to act on the copyright or
          intellectual property owner’s behalf.
        </p>
        <p>TotalSig’s Copyright Agent can be reached at:</p>
        <p>Email: copyright [at] TotalSig [dot] com</p>

        <h2>
          <strong>13. Binding arbitration and class action waiver</strong>
        </h2>
        <p>
          PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO
          FILE A LAWSUIT IN COURT
        </p>

        <p>
          <strong>13.1 Initial Dispute Resolution</strong>
        </p>
        <p>
          The parties shall use their best efforts to engage directly to settle any dispute, claim, question, or
          disagreement and engage in good faith negotiations which shall be a condition to either party initiating a
          lawsuit or arbitration.
        </p>

        <p>
          <strong>13.2 Binding Arbitration</strong>
        </p>
        <p>
          If the parties do not reach an agreed upon solution within a period of 30 days from the time informal dispute
          resolution under the Initial Dispute Resolution provision begins, then either party may initiate binding
          arbitration as the sole means to resolve claims, subject to the terms set forth below. Specifically, all
          claims arising out of or relating to these Terms (including their formation, performance and breach), the
          parties’ relationship with each other and/or your use of the Software shall be finally settled by binding
          arbitration administered by the Estonian Arbitration Association in accordance with the provisions of its
          Commercial Arbitration Rules and the supplementary procedures for consumer related disputes of the Estonian
          Arbitration Association (the “AAA”), excluding any rules or procedures governing or permitting class actions.
        </p>
        <p>
          The arbitrator, and not any federal, state or local court or agency, shall have exclusive authority to resolve
          all disputes arising out of or relating to the interpretation, applicability, enforceability or formation of
          these Terms, including, but not limited to any claim that all or any part of these Terms are void or voidable,
          or whether a claim is subject to arbitration. The arbitrator shall be empowered to grant whatever relief would
          be available in a court under law or in equity. The arbitrator’s award shall be written, and binding on the
          parties and may be entered as a judgment in any court of competent jurisdiction.
        </p>
        <p>
          The parties understand that, absent this mandatory provision, they would have the right to sue in court and
          have a jury trial. They further understand that, in some instances, the costs of arbitration could exceed the
          costs of litigation and the right to discovery may be more limited in arbitration than in court.
        </p>

        <p>
          <strong>13.3 Location</strong>
        </p>
        <p>
          Binding arbitration shall take place in Estonia. You agree to submit to the personal jurisdiction of any
          federal or state court in Tallinn, Estonia, in order to compel arbitration, to stay proceedings pending
          arbitration, or to confirm, modify, vacate or enter judgment on the award entered by the arbitrator.
        </p>

        <p>
          <strong>13.4 Class Action Waiver</strong>
        </p>
        <p>
          The parties further agree that any arbitration shall be conducted in their individual capacities only and not
          as a class action or other representative action, and the parties expressly waive their right to file a class
          action or seek relief on a class basis. YOU AND TotalSig AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER
          ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
          REPRESENTATIVE PROCEEDING. If any court or arbitrator determines that the class action waiver set forth in
          this paragraph is void or unenforceable for any reason or that an arbitration can proceed on a class basis,
          then the arbitration provision set forth above shall be deemed null and void in its entirety and the parties
          shall be deemed to have not agreed to arbitrate disputes.
        </p>

        <p>
          <strong>13.5 Exception - Litigation of Intellectual Property and Small Claims Court Claims</strong>
        </p>
        <p>
          Notwithstanding the parties’ decision to resolve all disputes through arbitration, either party may bring an
          action in state or federal court to protect its intellectual property rights (“intellectual property rights”
          means patents, copyrights, moral rights, trademarks, and trade secrets, but not privacy or publicity rights).
          Either party may also seek relief in a small claims court for disputes or claims within the scope of that
          court’s jurisdiction.
        </p>

        <p>
          <strong>13.6 30-Day Right to Opt Out</strong>
        </p>
        <p>
          You have the right to opt-out and not be bound by the arbitration and class action waiver provisions set forth
          above by sending written notice of your decision to opt-out to the following address: via email at{' '}
          <a href="mailto:legal-opt@totalsig.com">legal-opt@totalsig.com</a>. The notice must be sent within 30 days of
          your first use of the Software, whichever is later, otherwise you shall be bound to arbitrate disputes in
          accordance with the terms of those paragraphs. If you opt-out of these arbitration provisions, TotalSig also
          will not be bound by them.
        </p>

        <p>
          <strong>13.7 Changes to this Section</strong>
        </p>
        <p>
          TotalSig will provide 60-days’ notice of any changes to this section. Changes will become effective on the
          60th day, and will apply prospectively only to any claims arising after the 60th day.
        </p>
        <p>
          For any dispute not subject to arbitration you and TotalSig agree to submit to the personal and exclusive
          jurisdiction of and venue in the federal and state courts located in New York, New York. You further agree to
          accept service of process by mail, and hereby waive any and all jurisdictional and venue defenses otherwise
          available.
        </p>
        <p>
          The Terms and the relationship between you and TotalSig shall be governed by the laws of Estonia without
          regard to conflict of law provisions.
        </p>

        <h2>
          <strong>14. GENERAL INFORMATION</strong>
        </h2>
        <p>
          <strong>14.1 Entire Agreement</strong>
        </p>
        <p>
          These Terms (and any additional terms, rules and conditions of participation that TotalSig may post on the
          Software) constitute the entire agreement between you and TotalSig with respect to the Software and supersedes
          any prior agreements, oral or written, between you and TotalSig. In the event of a conflict between these
          Terms and the additional terms, rules and conditions of participation, the latter will prevail over the Terms
          to the extent of the conflict.
        </p>
        <p>
          <strong>14.2 Waiver and Severability of Terms</strong>
        </p>
        <p>
          The failure of TotalSig to exercise or enforce any right or provision of the Terms shall not constitute a
          waiver of such right or provision. If any provision of the Terms is found by an arbitrator or court of
          competent jurisdiction to be invalid, the parties nevertheless agree that the arbitrator or court should
          endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of
          the Terms remain in full force and effect.
        </p>
        <p>
          <strong>14.3 Statute of Limitations</strong>
        </p>
        <p>
          You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of
          or related to the use of the Software or the Terms must be filed within one (1) year after such claim or cause
          of action arose or be forever barred.
        </p>
        <p>
          <strong>14.4 Section Titles</strong>
        </p>
        <p>The section titles in the Terms are for convenience only and have no legal or contractual effect.</p>

        <p>
          <strong>14.5 Communications</strong>
        </p>
        <p>
          Users with questions, complaints or claims with respect to the Software may contact us using the relevant
          contact information set forth below.
        </p>

        <p>
          <a href="mailto:communications@totalsig.com">communications@totalsig.com</a>
        </p>
      </div>
    </ContentWrapper>
  )
}

export default TermsOfUse

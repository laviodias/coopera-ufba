'use client';

import { useParams } from 'next/navigation';
import ContactCompany from './CompanyProposal';
import ContactResearchGroup from './GroupProposal';

const SendProposal = () => {
  const { id, type } = useParams<{ id: string; type: 'empresa' | 'grupo' }>();

  if (type === 'empresa') {
    return <ContactCompany id={id} />;
  } else if (type === 'grupo') {
    return <ContactResearchGroup id={id} />;
  }
  
  return null;
};

export default SendProposal;

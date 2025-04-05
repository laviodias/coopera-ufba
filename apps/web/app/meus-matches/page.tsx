'use client';

import { useUser } from '@/context/UserContext';
import MeusMatchesPesquisador from './MeusMatchesPesquisador';
import MeusMatchesEmpresa from './MeusMatchesEmpresa';

function MeusMatches() {
  const { user } = useUser();
  console.log('user', user);

  if (user?.utype.includes('RESEARCHER')) {
    return MeusMatchesPesquisador();
  } else if (user?.utype.includes('COMPANY')) {
    return MeusMatchesEmpresa();
  }
}

export default MeusMatches;

/* src/hooks */
//importando as dependências necessárias
import { useState, useEffect, useRef, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { useToast } from 'native-base';

interface ILocation {
  latitude: number;
  longitude: number;
}

export default () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>(null); // será utilizado para armazenar alguma mensagem de erro, caso ocorra
  const [coords, setCoords] = useState<ILocation>({latitude:0, longitude: 0});   //vai armazenar a localização atual
  const toast = useToast();
// criando um useEffect que será executado uma vez quando o Hook for chamado (parâmetro passado ao fim da função é vazio).
  useEffect(() => {
    requestFilesPermissinGps()
    return () => {
    };
  }, [])

  const requestFilesPermissinGps = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (!readGranted || !writeGranted) {
      console.log('As permissões de leitura e gravação não foram concedidas');
      toast.show({
        title: 'As permissões de leitura e gravação não foram concedidas',
      });
      return;
    }
    else {
      _startUpdatingLocation();
    }
  };

  const _startUpdatingLocation =  () => {
    Geolocation.getCurrentPosition(       //se as permissões foram aceitas, obtemos a localização aqui
      ({ coords }) => {
// O parâmetro {coords} desestrutura a resposta, obtendo apenas a parte relativa às coordenadas. Você também pode receber apenas (position) e observar outras informações que são obtidas ao se solicitar a localização. Nesse exemplo, apenas precisamos das coordenadas.
        setCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }, (error) => {
        setErrorMsg('Não foi possível obter a localização');
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true } 
      //showLocationDialog: essa função convida automaticamente o usuário a ativar o GPS, caso esteja desativado.
      //enableHighAccuracy: vai solicitar a ativação do GPS e coletar os dados dele
      //timeout: determina o tempo máximo para o dispositivo coletar uma posição
      //maximumAge: tempo máximo para coleta de posição armazenada em cache
    )
}

//aqui retornamos as coordenadas e uma possível mensagem de erro que possa ter ocorrido.
  return { coords, errorMsg }
}
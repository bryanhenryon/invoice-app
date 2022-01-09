import styled from "styled-components";

import Button from "./Button";

import { breakpoints } from "../assets/style/variables";

export const InvoiceForm: React.FC = () => {
  return (
    <Container>
      <Title>Nouvelle facture</Title>
      <Form>
        <Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
          expedita exercitationem corporis illo suscipit, nihil doloremque
          quidem ipsa minus, repudiandae ex consectetur debitis dolor repellat
          qui numquam neque natus dolorem? Neque iste vero accusantium unde
          vitae. Dolorum sint quaerat, quae aspernatur et beatae numquam tenetur
          explicabo iusto omnis quibusdam corrupti soluta at ducimus id
          cupiditate autem? Voluptatibus ut exercitationem reprehenderit! Error
          accusamus incidunt consectetur esse perferendis magni vel accusantium
          dolores, ut nemo vit Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Non modi temporibus eius ratione deleniti facilis
          ad, eligendi id, saepe, amet asperiores repellat neque! Atque aliquid
          perspiciatis ea suscipit reiciendis maxime! Sapiente nostrum
          recusandae culpa id illo molestias nemo optio explicabo nesciunt
          perferendis nulla commodi deleniti porro dicta repellendus, dolore
          repudiandae incidunt animi blanditiis maiores dolorem asperiores, enim
          corporis aliquid. Quia. Pariatur iusto rem suscipit nam temporibus
          reiciendis doloribus accusantium magni consequatur sequi, neque facere
          vero minus, sint ullam ipsum deleniti non. Nulla mollitia ducimus,
          culpa qui iste veritatis. Voluptatem, quaerat. Accusamus vel
          consequatur exercitationem qui perspiciatis voluptas veritatis ea
          iusto ad tempora laudantium expedita sapiente iure recusandae laborum
          facere consectetur a, animi id eveniet. Dolor accusantium perspiciatis
          corporis quisquam dolorem! Dolor qui veritatis quas, sed quisquam
          mollitia eveniet dolore quis corporis. Commodi sunt magnam quibusdam
          quis, voluptatum cum esse atque. Maxime facere accusantium, beatae
          voluptatibus impedit nemo rem possimus velit! Explicabo eum magnam
          optio corrupti. Quibusdam, harum optio. Iure dolor eveniet dicta sunt
          temporibus quo enim, laborum atque exercitationem nihil, voluptatibus
          corporis laboriosam et rerum inventore in recusandae explicabo quasi?
          Quibusdam excepturi non consequuntur a tempore ducimus nostrum odit
          velit reiciendis! Explicabo magni aspernatur commodi. Non voluptatum
          veniam tempora ipsum iste, quibusdam modi omnis sequi pariatur,
          mollitia, quo aperiam nemo! Vero suscipit ea est voluptate, sunt animi
          molestias quibusdam, dolor ipsum architecto deleniti explicabo impedit
          officiis necessitatibus ipsam, illum aut omnis. Magni minima sed
          fugiat esse incidunt inventore recusandae ex. Dolor quo tenetur atque!
          Ullam, placeat accusantium cumque quia neque tempore soluta a illum
          magnam nostrum reiciendis, porro nisi maiores aliquam, unde nemo!
          Ipsum nisi perspiciatis velit, vel natus molestiae? Corrupti,
          voluptates magni sunt blanditiis a ad earum provident alias ea. Quis
          harum nihil nam omnis iusto adipisci porro et inventore veniam sit
          deleniti, unde quo iure. Quod, dolorem asperiores! Perferendis quam,
          maiores facere aperiam enim in nulla quo debitis beatae ut blanditiis
          nesciunt quis officiis consectetur officia suscipit mollitia
          repellendus. Hic unde, voluptatum nemo animi soluta itaque voluptas
          ut? Repudiandae quae quisquam nulla assumenda voluptates, magni
          placeat, ea reprehenderit tenetur delectus nesciunt culpa suscipit,
          odio libero quas! Consequuntur incidunt praesentium ratione
          repudiandae, eaque iure laboriosam voluptas perferendis dolor
          nesciunt! Minima consequatur magni debitis aperiam optio commodi rerum
          quos fuga? Tempore quisquam, consequuntur earum ut adipisci ea in
          pariatur, harum voluptatem eveniet fuga accusamus, doloremque
          asperiores nesciunt maxime. Esse, eos. Molestias aliquam sint sit
          vitae voluptatibus totam? Temporibus ex magnam doloribus totam
          praesentium corrupti labore maiores cum dolor vel, incidunt iusto non
          maxime excepturi nihil! Sequi quaerat iure non fugit? Ex, quibusdam
          officiis, aliquid eligendi rerum a nulla, at quo vel nesciunt
          temporibus. Necessitatibus, totam maiores voluptatibus corporis
          pariatur enim minima ipsam minus repellendus labore. Necessitatibus
          fugit unde corporis nobis? Quod architecto possimus minima asperiores
          accusantium porro tempora maiores maxime reiciendis non nostrum,
          quisquam quaerat delectus autem enim exercitationem eos. Quidem ipsa
          ipsum eligendi eius aut reiciendis laudantium nobis nesciunt? Placeat
          odit provident assumenda id accusamus, cumque, at necessitatibus
          laboriosam, magni fugit excepturi exercitationem quas nemo! Molestias
          vero iure perspiciatis adipisci facere non, dolore, sit praesentium
          quo incidunt, cupiditate sint. Cupiditate eligendi voluptatem aut et
          omnis. Laboriosam, inventore officia. Ipsum magni officia tempora
          ratione molestiae porro, accusantium adipisci possimus. Odio dolore
          cupiditate itaque in! Unde vel magni porro quia nisi! Itaque ipsam
          cum, possimus beatae assumenda perspiciatis reprehenderit tenetur
          corporis illum, amet nisi. Magni sapiente dicta eos itaque tenetur
          eius, quaerat, expedita omnis veritatis modi deserunt obcaecati
          suscipit incidunt facilis! Atque quas dolores ad dolor iure
          reprehenderit distinctio voluptate eius dolorem quae. Vel quis
          voluptatem enim a laudantium? Ipsum odio fugiat, dolorem eos qui
          officia dignissimos. Quidem ipsam odio atque.
        </Content>
        <ActionButtons>
          <ActionButtonsFirst>
            <Button variant='light'>Annuler</Button>
          </ActionButtonsFirst>

          <ActionButtonsSecond>
            <Button variant='dark'>Brouillon</Button>
            <Button>Enregistrer</Button>
          </ActionButtonsSecond>
        </ActionButtons>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.darkToWhite};
  padding: 3.2rem 2.4rem;

  @media ${breakpoints.sm} {
    padding: 5.6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 4.8rem;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  padding-right: 1.6rem;

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.lightGreySecondaryToLightDarkSecondary};
    border-radius: 0.4rem;
  }

  @media ${breakpoints.sm} {
    overflow-y: scroll;
  }
`;

const ActionButtons = styled.div`
  padding: 3.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: space-between;
  background: ${({ theme }) => theme.whiteToLightDarkTertiary};
  transition: background-color 0.3s;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`;

const ActionButtonsFirst = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButtonsSecond = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`;

export default InvoiceForm;
